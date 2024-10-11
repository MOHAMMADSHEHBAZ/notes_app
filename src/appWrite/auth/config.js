import conf from '../../conf/conf';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class NoteService {
    client = new Client();
    databases;
    bucket;
    
    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createNote({ title, content, userId, status, file }) {
        try {
            const uploadedFile = await this.uploadFile(file);
            return await this.databases.createDocument(
                conf.appWriteDataBaseId,
                conf.appWriteCollectionId,
                ID.unique(), 
                {
                    title,
                    content,
                    userId,
                    status, 
                    fileId: uploadedFile.$id,
                    downloadCount: 0 
                }
            );
        } catch (error) {
            console.error("NoteService :: createNote :: error", error);
            return false;
        }
    }

    async contactUs({email,subject,message}){
        try{
            return await this.databases.createDocument(
                conf.appWriteDataBaseId,
                conf.appWriteCollectionId2,
                ID.unique(),
                {
                    email,
                    subject,
                    message
                }
            )
        }
        catch(error){
            console.error(error.message);
            return false;
        }
    }

    async updateNote(noteId, { title, content, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appWriteDataBaseId,
                conf.appWriteCollectionId,
                noteId, 
                {
                    title,
                    content,
                    status, 
                }
            );
        } catch (error) {
            console.error("NoteService :: updateNote :: error", error);
            return false;
        }
    }

    async deleteNote(noteId) {
        try {
            await this.databases.deleteDocument(
                conf.appWriteDataBaseId,
                conf.appWriteCollectionId,
                noteId
            );
            return true;
        } catch (error) {
            console.error("NoteService :: deleteNote :: error", error);
            return false;
        }
    }

    async getAllNotes(queries = [Query.equal('status', 'active')]) {
        try {
            return await this.databases.listDocuments(
                conf.appWriteDataBaseId,
                conf.appWriteCollectionId,
                queries
            );
        } catch (error) {
            console.error("NoteService :: getAllNotes :: error", error);
            return false;
        }
    }

    async downloadNote(noteId) {
        try {
            const note = await this.databases.getDocument(
                conf.appWriteDataBaseId,
                conf.appWriteCollectionId,
                noteId
            );

            const filePreview = this.getFilePreview(note.fileId);

            await this.incrementDownloadCount(noteId, note.downloadCount);

            return filePreview;
        } catch (error) {
            console.error("NoteService :: downloadNote :: error", error);
            return false;
        }
    }

    async incrementDownloadCount(noteId, currentCount) {
        try {
            return await this.databases.updateDocument(
                conf.appWriteDataBaseId,
                conf.appWriteCollectionId,
                noteId,
                {
                    downloadCount: currentCount + 1
                }
            );
        } catch (error) {
            console.error("NoteService :: incrementDownloadCount :: error", error);
            return false;
        }
    }

    async getDownloadCount(noteId) {
        try {
            const note = await this.databases.getDocument(
                conf.appWriteDataBaseId,
                conf.appWriteCollectionId,
                noteId
            );
            return note.downloadCount;
        } catch (error) {
            console.error("NoteService :: getDownloadCount :: error", error);
            return false;
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.error("NoteService :: uploadFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appWriteBucketId,
            fileId
        );
    }

}

const noteService = new NoteService();
export default noteService;

const conf = {
    appWriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appWriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWriteDataBaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appWriteCollectionId2 : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID2),
    appWriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}

export default conf
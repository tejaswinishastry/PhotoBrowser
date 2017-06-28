import Dexie from 'dexie'

const photosDb = new Dexie('PhotosDB')
photosDb.version(1).stores({
    photos: "++key",
    albums: "++id"
})

export default photosDb
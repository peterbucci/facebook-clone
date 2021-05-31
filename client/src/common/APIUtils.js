import db from '../firebase'

const reduceDocs = snapshot => snapshot.docs.reduce((docs, doc) => {
  return {
    ...docs,
    [doc.data().id]: doc.data()
  }
}, {})

const getSnapshot = ({ 
  collection, 
  filter,
  order,
  setState,
  useReduce
}) => {
  const [key, qualifier, value] = filter

  const onSnapShot = snapshot => {
    const snapshotData = useReduce
      ? reduceDocs(snapshot)
      : snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })

    setState(snapshotData)
  }

  if (order) {
    const [orderByKey, orderByDirection] = order
    db.collectionGroup(collection)
      .where(key, qualifier, value)
      .orderBy(orderByKey, orderByDirection)
      .onSnapshot(onSnapShot)
  } else {
    db.collectionGroup(collection)
      .where(key, qualifier, value)
      .onSnapshot(onSnapShot)
  }
}

const getPost = ({
  collection,
  postId,
  setState
}) => {
  db.collectionGroup(collection)
    .doc(postId)
    .then(res => console.log(res))
}

export { getSnapshot, getPost }
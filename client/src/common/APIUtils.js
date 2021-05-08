import db from '../firebase'

const getSnapshot = ({ 
  collection, 
  filter,
  order,
  setState,
  modifyData 
}) => {
  const [key, qualifier, value] = filter

  const onSnapShot = snapshot => {
    const snapshotData = modifyData
      ? modifyData(snapshot)
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

}

export { getSnapshot, getPost }
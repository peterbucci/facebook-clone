import db from "firebase.js";
import { actionTypes } from "reducers/state_reducer";

export const getProfile = async (profileURL, uid, pid, dispatch) => {
  let user = db.collection("users");
  user = profileURL ? user.where("url", "==", profileURL) : user.doc(uid);

  user = await user
    .get()
    .then((res) => (profileURL ? res.docs[0].data() : res.data()));
  const pic =
    pid || user.profilePic
      ? await db
          .collection("users")
          .doc(user.id)
          .collection("posts")
          .doc(pid ?? user.profilePic)
          .get()
          .then((res) => res.data())
      : null;

  dispatch({
    type: actionTypes.UPDATE_USERS,
    users: [user],
  });
  pic &&
    dispatch({
      type: actionTypes.SET_POSTS,
      profilePics: [pic],
    });
  return {
    user,
    pic,
  };
};

export const getProfileDetails = async (userId, types, dispatch) => {
  const queryOperator = Array.isArray(types) ? "in" : "==";
  const profileDetails = await db
    .collection("users")
    .doc(userId)
    .collection("profiledetails")
    .where("type", queryOperator, types)
    .orderBy("order", "desc")
    .get()
    .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()));

  dispatch({
    type: actionTypes.SET_PROFILE_DETAILS,
    profileDetails: profileDetails
  })
};

export const addProfileDetail = async (userId, formData, type, detailId, idx, dispatch) => {
  let detailQuery = db
    .collection("users")
    .doc(userId)
    .collection("profiledetails");

  if (detailId) {
    detailQuery = detailQuery.doc(detailId);
    await detailQuery.update(formData);
    dispatch({
      type: actionTypes.UPDATE_PROFILE_DETAIL,
      updatedDetail: formData,
      detailType: type,
      idx
    })
  } else {
    detailQuery = detailQuery.doc();
    const id = detailQuery.id;
    const detailDoc = {
      id,
      type,
      userId,
      ...formData,
    };
    await detailQuery.set(detailDoc);
    dispatch({
      type: actionTypes.ADD_PROFILE_DETAILS,
      profileDetails: [detailDoc]
    })
  }
};

export const deleteProfileDetail = (detailId, userId, idx, type, dispatch) => {
  db.collection("users")
    .doc(userId)
    .collection("profiledetails")
    .doc(detailId)
    .delete()
    .then(() => {
      dispatch({
        type: actionTypes.DELETE_PROFILE_DETAIL,
        idx,
        detailType: type
      })
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
};

export const getAlbums = async (userId, dispatch) => {
  const albums = await db
    .collectionGroup("albums")
    .where("userId", "==", userId)
    .orderBy("timestamp")
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => doc.data());
    });

  const albumCoverIds = albums.reduce((albums, album) => {
    return album.cover ? [...albums, album.cover] : albums;
  }, []);

  const albumCovers = await db
    .collectionGroup("posts")
    .where("id", "in", albumCoverIds)
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => doc.data());
    });

  dispatch({
    type: actionTypes.SET_POSTS,
    profilePics: albumCovers,
  });

  return albums;
};

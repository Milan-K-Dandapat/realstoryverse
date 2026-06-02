import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  deleteDoc,
  increment
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export const getStories = async () => {
  try {

    const querySnapshot = await getDocs(
      collection(db, "stories")
    );

    const stories = [];

    querySnapshot.forEach((doc) => {
      stories.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    stories.sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    );

    return stories;

  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addStory = async (storyData) => {
  try {

    const docRef = await addDoc(
      collection(db, "stories"),
      storyData
    );

    return docRef.id;

  } catch (error) {
    console.log(error);
  }
};
export const deleteStory = async (
  storyId
) => {

  try {

    await deleteDoc(
      doc(
        db,
        "stories",
        storyId
      )
    );

  } catch (error) {

    console.log(error);
  }
};
export const updateStory = async (
  storyId,
  storyData
) => {

  try {

    const storyRef =
      doc(
        db,
        "stories",
        storyId
      );

    await updateDoc(
      storyRef,
      storyData
    );

  } catch (error) {

    console.log(error);
  }
};
export const makeFeaturedStory =
  async (storyId) => {

    try {

      const storiesRef =
        collection(
          db,
          "stories"
        );

      const featuredQuery =
        query(
          storiesRef,
          where(
            "featured",
            "==",
            true
          )
        );

      const featuredStories =
        await getDocs(
          featuredQuery
        );

      for (
        const document of
        featuredStories.docs
      ) {

        await updateDoc(
          doc(
            db,
            "stories",
            document.id
          ),
          {
            featured:false
          }
        );
      }

      await updateDoc(
        doc(
          db,
          "stories",
          storyId
        ),
        {
          featured:true
        }
      );

    } catch (error) {

      console.log(error);
    }
};
export const incrementViews =
  async (storyId) => {

    try {

      const storyRef =
        doc(
          db,
          "stories",
          storyId
        );

      await updateDoc(
        storyRef,
        {
          views:
            increment(1)
        }
      );

    } catch (error) {

      console.log(error);
    }
};

export const incrementLikes =
  async (storyId) => {

    try {

      const storyRef =
        doc(
          db,
          "stories",
          storyId
        );

      await updateDoc(
        storyRef,
        {
          likes:
            increment(1)
        }
      );

    } catch (error) {

      console.log(error);
    }
};

export const incrementShares =
  async (storyId) => {

    try {

      const storyRef =
        doc(
          db,
          "stories",
          storyId
        );

      await updateDoc(
        storyRef,
        {
          shares:
            increment(1)
        }
      );

    } catch (error) {

      console.log(error);
    }
};
export const incrementRequests =
  async (storyId) => {

    const storyRef =
      doc(
        db,
        "stories",
        storyId
      );

    await updateDoc(
      storyRef,
      {
        requests:
          increment(1)
      }
    );
};
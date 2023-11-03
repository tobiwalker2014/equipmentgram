"use client";

import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "@firebase/firestore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { db } from "../firebaseConfig/init";

export interface IBlog {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  imageUrl?: string;
  category: ICategory;
}

interface ICategory {
  id: string;
  name: string;
}

export const BlogsCollection = "blogs";
export const CategoriesCollection = "categories";

export const useBlogs = () => {
  return useQuery<IBlog[], Error>([BlogsCollection], async () => {
    const snapshot = await getDocs(collection(db, BlogsCollection));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as IBlog));
  });
};

export const useBlogById = (id: string) => {
  return useQuery<IBlog, Error>([BlogsCollection, id], async () => {
    const snapshot = await getDocs(collection(db, BlogsCollection));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as IBlog))[0];
  });
};

export const useBlogByCategory = (category: string) => {
  return useQuery<IBlog[], Error>([BlogsCollection, category], async () => {
    const q = query(collection(db, BlogsCollection), where("category.name", "==", category));

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as IBlog));
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (blog: IBlog) => {
      return addDoc(collection(db, BlogsCollection), blog);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([BlogsCollection]);
        queryClient.refetchQueries([BlogsCollection]);
      },
    }
  );
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (blog: IBlog) => {
      return updateDoc(doc(db, BlogsCollection, blog.id), { blog });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([BlogsCollection]);
        queryClient.refetchQueries([BlogsCollection]);
      },
    }
  );
};

export const createCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (category: string) => {
      return addDoc(collection(db, CategoriesCollection), {
        name: category,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([BlogsCollection]);
        queryClient.refetchQueries([BlogsCollection]);
      },
    }
  );
};

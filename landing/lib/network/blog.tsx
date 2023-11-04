"use client";

import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "@firebase/firestore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { db } from "../firebaseConfig/init";

export interface IBlog {
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  imageUrl?: string;
  category: ICategory;
}

interface IBlogWithId extends IBlog {
  id: string;
}

interface ICategory {
  name: string;
}
interface ICategoryWithId extends ICategory {
  id: string;
}

export const BlogsCollection = "blogs";
export const CategoriesCollection = "categories";

export const useBlogs = () => {
  return useQuery<IBlogWithId[], Error>([BlogsCollection], async () => {
    const snapshot = await getDocs(collection(db, BlogsCollection));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as IBlogWithId));
  });
};

export const useBlogById = (id: string) => {
  return useQuery<IBlogWithId, Error>([BlogsCollection, id], async () => {
    const snapshot = await getDocs(collection(db, BlogsCollection));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as IBlogWithId))[0];
  });
};

export const useBlogByCategory = (category: string) => {
  return useQuery<IBlogWithId[], Error>([BlogsCollection, category], async () => {
    const q = query(collection(db, BlogsCollection), where("category.name", "==", category));

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as IBlogWithId));
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
    (blog: IBlogWithId) => {
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

export const useCreateCategory = () => {
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

export const useCategories = () => {
  return useQuery<ICategory[], Error>([CategoriesCollection], async () => {
    const snapshot = await getDocs(collection(db, CategoriesCollection));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as ICategoryWithId));
  });
};

import { collection, doc, getDoc, getDocs, orderBy, query, limit, serverTimestamp, updateDoc, startAfter, endBefore, limitToLast, writeBatch, increment } from 'firebase/firestore'
import { useState } from 'react'
import { db } from '../firebase'

export const useBlogHandle = () => {
    const batch = writeBatch(db)
    const colRef = collection(db, 'blog')
    const countRef = doc(db, 'blog-count', "COUNT")
    const [currentBlogs, setCurrentBlogs] = useState([])
    const [firstVisible, setFirstVisible] = useState({})
    const [lastVisible, setLastVisible] = useState({})
    const [blogCount, setBlogCount] = useState('')
    let [pageNumber, setPageNumber] = useState(1)

    function toSetBlogs(result, blogs) {
        if (result.length !== 0) {
            setFirstVisible(blogs.docs[0])
            setLastVisible(blogs.docs[blogs.docs.length - 1])
            setCurrentBlogs(result)
        }
    }

    const fetchBlogs = async ({ numberOfBlogs, onFail }) => {
        try {
            const q = query(colRef, orderBy("timeStamp", "desc"), limit(numberOfBlogs));
            const blogs = await getDocs(q)
            const result = blogs.docs.map(doc => ({ ...doc.data(), id: doc.id }))
            toSetBlogs(result, blogs)
        } catch (error) {
            console.log(error);
            onFail(error.message);
        }
    }

    const fetchNextBlogs = async (numberOfBlogs) => {
        try {
            const next = query(colRef, orderBy("timeStamp", "desc"), startAfter(lastVisible), limit(numberOfBlogs));
            const blogs = await getDocs(next)
            const result = blogs.docs.map(doc => ({ ...doc.data(), id: doc.id }))
            toSetBlogs(result, blogs)
            if (result.length !== 0) {
                setPageNumber(pageNumber += 1)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchPreviousBlogs = async (numberOfBlogs) => {
        try {
            const previous = query(colRef, orderBy("timeStamp", "desc"), endBefore(firstVisible), limitToLast(numberOfBlogs));
            const blogs = await getDocs(previous)
            const result = blogs.docs.map(doc => ({ ...doc.data(), id: doc.id }))
            toSetBlogs(result, blogs)
            if (result.length !== 0) {
                setPageNumber(pageNumber -= 1)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchBlogById = async ({ id, onFetchByIdSuccess, onFail }) => {
        try {
            const docRef = doc(db, "blog", id);
            const docSnap = await getDoc(docRef);
            onFetchByIdSuccess(docSnap.data())
        } catch (error) {
            console.log(error);
            onFail(error.message);
        }
    }

    const createBlog = async ({ blogTitle, authorName, content, onSuccess, onFail }) => {
        try {
            // Add a new document with a generated id
            const newBlogRef = doc(colRef);

            // await setDoc(newBlogRef, { blogTitle, authorName, content, timeStamp: serverTimestamp() })
            batch.set(newBlogRef, { blogTitle, authorName, content, timeStamp: serverTimestamp() })
            batch.update(countRef, { "blogCount": increment(1) })

            // Commit the batch
            await batch.commit();
            onSuccess()
        } catch (error) {
            onFail(error.message)
        }
    }

    const updateBlog = async ({ id, blogTitle, authorName, content, onSuccess, onFail }) => {
        try {
            const docRef = doc(db, 'blog', id)
            await updateDoc(docRef, { blogTitle, authorName, content, timeStamp: serverTimestamp() })
            onSuccess()
        } catch (error) {
            onFail(error.message)
        }
    }

    const deleteBlog = async ({ id, onFail }) => {
        try {
            const docRef = doc(db, 'blog', id)
            batch.delete(docRef)
            batch.update(countRef, { "blogCount": increment(-1) })
            await batch.commit()     
            setCurrentBlogs(blogs=>blogs.filter(blog=>blog.id !== id))
        } catch (error) {
            onFail(error.message)
        }
    }

    const fetchBlogCount = async () => {
        try {
            const docSnap = await getDoc(countRef);
            const count = docSnap.data()
            setBlogCount(count.blogCount)
        } catch (error) {

        }
    }

    return { fetchBlogs, currentBlogs, createBlog, updateBlog, fetchBlogById, deleteBlog, fetchNextBlogs, fetchPreviousBlogs, fetchBlogCount, blogCount, pageNumber }

}




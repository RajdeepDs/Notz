import React from 'react'
import { CheckIcon, ShareIcon, TrashIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'
import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { addDoc, collection, doc, serverTimestamp, updateDoc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify'
import Link from 'next/link';
import Head from 'next/head'

export default function Add() {
    const [note, setNote] = useState({ title: "", description: "" });
    const [user, loading] = useAuthState(auth);
    const route = useRouter();
    const routeData = route.query;

    // Submit Post
    const submitNote = async (e) => {
        e.preventDefault();

        // Run Check for title and Desc
        if (!note.title && !note.description) {
            toast.error('Input Field empty', {
                // position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });

            return;
        }
        if (note?.hasOwnProperty("id")) {
            const docRef = doc(db, 'notes', note.id);
            const updatedNote = { ...note, timestamp: serverTimestamp() }
            await updateDoc(docRef, updatedNote);
            return route.push("/home");
        } else {
            // Make Post
            const collectionRef = collection(db, 'notes')
            await addDoc(collectionRef, {
                ...note,
                timestamp: serverTimestamp(),
                user: user.uid,
                avatar: user.photoURL,
                username: user.displayName,
            })
            setNote({ title: "", description: "" });
            return route.push('/home')
        }
    }
    // Delete Notes
    const deleteNote = async (id) => {
        const docRef = doc(db, 'notes', id,);
        await deleteDoc(docRef);
        return route.push("/home");
    }
    //Check our user
    const checkUser = async () => {
        if (loading) return;
        if (!user) { route.push("/auth/login"); }
        if (routeData.id) {
            setNote({ title: routeData.title, description: routeData.description, id: routeData.id });
        }
    };
    useEffect(() => {
        checkUser();
    }, [user, loading])
    return (
        <div>
            <Head>
                <title>Add | Edit | Notz</title>
                <link rel="icon" href="/LogoIcon.png" />
            </Head>
            <form>
                <div className="flex justify-between py-6 px-3 items-center">
                    <Link href={{ pathname: "/home", query: note }}>
                        <button className='w-[24px]'>
                            <ChevronLeftIcon />
                        </button>
                    </Link>
                    <h2 className='font-medium text-[24px]'>
                        {note.hasOwnProperty("id") ? "Edit Note" : "Add Note"}</h2>
                    <div className="flex space-x-4 items-center">
                        <button type="submit" onClick={submitNote} className='w-[24px]'>
                            <CheckIcon />
                        </button>
                        {/* <button className='w-[24px]'>
                            <ShareIcon />
                        </button> */}
                        <Link href={{ pathname: "/home", query: note }}>
                            <button className='w-[24px]' onClick={() => deleteNote(note.id)}>
                                <TrashIcon />
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="mx-4 bg-white shadow-lg">
                    <input
                        type="text"
                        value={note.title}
                        onChange={(e) => setNote({ ...note, title: e.target.value })}
                        className='w-full px-6 py-3 outline-none mb-4' placeholder='Add Title' />
                    <textarea
                        value={note.description}
                        onChange={(e) => setNote({ ...note, description: e.target.value })}
                        placeholder='Add Description'
                        className='px-6 py-3 h-[60vh] w-full outline-none'></textarea>
                </div>
            </form >
        </div >
    )
}

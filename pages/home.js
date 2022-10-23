import Link from 'next/link'
import Head from 'next/head'
import React from 'react'
import AddNote from '../components/addnote'
import Nav from '../components/nav'
import Notes from '../components/notes'
import { useEffect, useState } from 'react'
import { auth, db } from '../utils/firebase';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function Home() {
    const route = useRouter();
    const [user, loading] = useAuthState(auth);
    // Create a state with all the notes
    const [allNotes, setAllNotes] = useState([]);

    const getNotes = async () => {
        const collectionRef = collection(db, 'notes');
        const q = query(collectionRef, where('user', '==', user?.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setAllNotes(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        });
        return unsubscribe;
    };
    // Delete Notes
    const deleteNote = async (id) => {
        const docRef = doc(db, 'notes', id,);
        await deleteDoc(docRef);
    }
    // Check user
    const checkUser = async () => {
        if (loading) return;
        if (!user) {
            route.push("/auth/login");
        }
    };
    // Get User Data
    useEffect(() => {
        checkUser();
        getNotes();
    }, []);

    return (
        <div>
            <Head>
                <title>All Notes | Notz</title>
                <link rel="icon" href="/LogoIcon.png" />
            </Head>
            <div className="sticky top-0 bg-white shadow-lg rounded-lg mb-4 items-center">
                <Nav />
            </div>
            {allNotes.map((note) => {
                return (
                    <Notes {...note} key={note.id}>
                        <div className="flex justify-end space-x-4">
                            <Link href={{ pathname: "/add", query: note }}>
                                <button className='w-6'>
                                    <PencilSquareIcon />
                                </button>
                            </Link>
                            <button
                                onClick={() => deleteNote(note.id)} className='w-6'>
                                <TrashIcon />
                            </button>
                        </div>
                    </Notes>
                );
            })}
            <AddNote />
        </div>
    )
}

"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const route=useRouter()

    useEffect(() => {
        fetch("/api/external")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setPosts(data.data);
                } else {
                    setError(data.message);
                }
            })
            .catch(() => setError("An unexpected error occurred."))
            .finally(() => setLoading(false));
    }, []);

    return (
        <main className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                <header className="bg-gray-900 text-white py-5 px-6">
                    <h1 className="text-3xl font-bold">Posts</h1>
                </header>
                <div className="flex justify-center bg-zinc-500">
                  <button onClick={()=>route.push('/api/external')} className="bg-zinc-300 font-semibold text-black h-8 w-12 rounded-lg mt-4 mb-4">
                    API
                    </button>
                    </div>
                <div className="p-6 bg-gray-100">
                    {loading ? (
                        <p className="text-lg font-semibold text-gray-700 animate-pulse">
                            Loading posts...
                        </p>
                    ) : error ? (
                        <p className="text-lg font-semibold text-red-600">
                            {error}
                        </p>
                    ) : posts.length > 0 ? (
                        <ul className="space-y-4">
                            {posts.map((post: { id: number; title: string }) => (
                                <li
                                    key={post.id}
                                    className="p-4 rounded-lg bg-gray-200 border border-gray-300 shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
                                >
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {post.title}
                                    </h2>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-lg font-semibold text-gray-500">
                            No posts available.
                        </p>
                    )}
                </div>
            </div>
        </main>
    );
}

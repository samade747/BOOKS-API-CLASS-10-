"use client"

import { useState, useEffect } from "react"

export default function FetchPostsPage() {
    const [posts, setPosts] = useState([]) 
    const [error, setError] = useState("") 
    const [loading, setLoading] = useState(true) 

    useEffect(() => {
        fetch("/api/external")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setPosts(data.data) 
                } else {
                    setError(data.message) 
                }
            })
            .catch((err) => setError(`An unexpected error occurred ${err.message}`)) 
            .finally(() => setLoading(false)) 
    }, [])

    return (
        <div>
            <h1>Posts</h1>
            {loading && <p>Loading...</p>} 
            {error && <p>Error: {error}</p>} 
            <ul>
                {posts.map((post: { id: number; title: string }) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    )
}

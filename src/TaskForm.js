import React, { useState } from "react";

export default function TaskForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const task = { title };
        if (description.trim() !== "") {
            task.description = description;
        }

        try {
            const res = await fetch("/create-task", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(task),
            });

            if (!res.ok) throw new Error("Failed to create task");

            const data = await res.json();
            setResponse(data);

            setTitle("");
            setDescription("");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
            <h2>Create Task</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{ padding: "8px", fontSize: "14px" }}
                />
                <input
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ padding: "8px", fontSize: "14px" }}
                />
                <button
                    type="submit"
                    style={{ padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}
                >
                    Create
                </button>
            </form>

            {response && (
                <div style={{ marginTop: "20px", border: "1px solid #ddd", padding: "10px", borderRadius: "5px", backgroundColor: "#f9f9f9" }}>
                    <h3>Task Created</h3>
                    <p><strong>Title:</strong> {response.title}</p>
                    <p><strong>Description:</strong> {response.description || "—"}</p>
                    <p><strong>Status:</strong> {response.status}</p>
                    <p><strong>Due:</strong> {new Date(response.dueDate).toLocaleString()}</p>
                </div>
            )}
        </div>
    );
}

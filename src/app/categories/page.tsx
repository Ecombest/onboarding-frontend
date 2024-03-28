"use client";

import { CATEGORY, CLIP_ART } from "@/constanst/clipart.const";
import { useState } from "react";

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY[0]);
  return (
    <div
      style={{
        padding: "20px",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          background: "#fff",
          width: "100%",
          height: "100%",
          borderRadius: "6px",
          display: "grid",
          gridTemplateColumns: "20% 80%",
        }}
      >
        <div>
          <h1
            style={{
              padding: "10px",
              cursor: "pointer",
              fontSize: "24px",
              textAlign: "center",
              fontWeight: "bold",
              background: "#37d998",
              color: "#fff",
            }}
          >
            Categories
          </h1>
          {CATEGORY.map((category, index) => (
            <h2
              style={{
                padding: "10px",
                cursor: "pointer",
                background: selectedCategory._id === category._id ? "#f0f0f0" : "#fff",
              }}
              onClick={() => setSelectedCategory(category)}
              key={index}
            >
              {category.name}
            </h2>
          ))}
        </div>
        <div>
          <h1
            style={{
              padding: "10px",
              cursor: "pointer",
              fontSize: "24px",
              textAlign: "center",
              fontWeight: "bold",
              background: "#37d998",
              color: "#fff",
            }}
          >
            Clip arts
          </h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "10px",
            }}
          >
            {CLIP_ART.filter((clip) => clip.categoryId === selectedCategory._id).map((clip, index) => (
              <div
                key={index}
                style={{
                  background: "#f0f0f0",
                  padding: "10px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  display: "flex",
                }}
              >
                <img
                  width="100px"
                  height="100px"
                  src={`https://ecb-personalize-storage.sgp1.digitaloceanspaces.com/${clip.thumbnail}`}
                  alt={clip.name}
                />
                <p>{clip.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

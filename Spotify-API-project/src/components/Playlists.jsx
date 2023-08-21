import { useEffect, useState } from "react";

export default function Playlists({ token }) {
    const baseAPI = 'https://api.spotify.com/'
    const [offset, setOffset] = useState(0)
    const [playlists, setPlaylists] = 

    useEffect(() => {
        const getPlaylists = async () => {
            try {
                const response = await fetch(
                    `${baseAPI}v1/me/playlists?offset=${offset}`, {
                    method: "get",
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                })
                const result = await response.json();
                console.log(result)
            } catch (error) {

            }
        }
        getPlaylists();
    }, [])
}
'use client'
import axios from "axios"
import {Dispatch} from "redux"
import { apiUrl } from "@/config/url"

export const getBlogs = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${apiUrl}/blog`)

            return res.data
        } catch(error) {
            return Promise.reject(error.response.data)
        } finally {

        }
    }
}

export const getBlogBySlug = (slug) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${apiUrl}/blog/slug/${slug}`)

            return res.data
        } catch(error) {
            return Promise.reject(error.response.data)
        } finally {

        }
    }
}
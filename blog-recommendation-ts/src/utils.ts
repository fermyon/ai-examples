import { HttpResponse } from "@fermyon/spin-sdk"
import { parse } from 'node-html-parser'

interface WebpageData {
    title: string,
    description: string
}

async function fetchDataFromWebpage(url: string): Promise<WebpageData> {
    let response = await fetch(url)
    let html = await response.text()
    let root = parse(html);
    let title = root.querySelector('h1')?.innerText || ""
    let description = root.querySelector('meta[name="description"]')
    return {
        title: unescapeHTML(title),
        description: description?.attributes.content || ""
    }
}

function sendResponse(status: number, headers?: Record<string, string>, body?: string | ArrayBuffer): HttpResponse {
    return {
        status: status,
        headers: headers || {},
        body: body || new Uint8Array()
    }
}

function send404response() {
    return {
        status: 404
    }
}

function unescapeHTML(str: string): string {
    return str.replace(
        /&amp;|&lt;|&gt;|&#39;|&quot;|&#x3D;|&#x27;/g,
        tag =>
        ({
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&#39;': "'",
            '&quot;': '"',
            '&#x3D;': '=',
            '&#x27;': "'"
        }[tag] || tag)
    )
}

// 5 minute cache timer
function checkCacheExpiry(currentTime: number, cachedTime: number) {
    return (currentTime - cachedTime) > 300000
}

export { fetchDataFromWebpage, sendResponse, send404response, checkCacheExpiry }
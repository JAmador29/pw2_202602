import {defineConfig} from "vite";
import path, {resolve} from "node:path";
import * as glob from "glob";

import HtmlCssPurgePlugin from "vite-plugin-purgecss";
import HandlebarPlugin from 'vite-plugin-handlebars' 

function obtenerHtmlFiles() {
    return Object.fromEntries(
        glob.sync(
            './**/*.html',
            {
                ignore: [
                    './dist/**',
                    './node_modules/**'
                ]
            }
        ).map((file) => {
            return[
                file.slice(0,file.length   -path.extname(file).length ),//Nombre de archivo sin extension
                resolve(__dirname, file)//full path del archivo
            ]
        })
    )
}

/*
    {
     "index": "~/...../index.html",
     "productos": "~/...../productos.html",}

 */

export default defineConfig({
    appType: 'mpa',
    build:{
        rolldownOptions:{
            input: obtenerHtmlFiles()
        }
    },
    plugins: [
        HandlebarPlugin({
            partialDirectory: resolve(__dirname, 'src/partials'),
        }), 
        HtmlCssPurgePlugin()
    ],
})
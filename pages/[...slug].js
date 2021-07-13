
import fs from 'fs'
import { join } from 'path'

import React from 'react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import matter from 'gray-matter'

import { getArticleSlugs, getArticleSlugFromString, articleDirectory, pythonDirectory } from '../lib/api';
import Layout from '../components/layouts/globalTemplate'
import BreadCrumbs from '../components/utilities/breadCrumbs'
import SideBar from '../components/navigation/sideNav'
// import FloatingNav from '../../components/utilities/floatingNav'

// MDX Components 
import Component from '../components/layouts/component'
import Code from '../components/blocks/code'
import Note from '../components/blocks/noted'
import Tip from '../components/blocks/tip'
import Important from '../components/blocks/important'
import YouTube from '../components/blocks/youTube'
import Autofunction from '../components/blocks/autofunction'

export default class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null,
            loading: true,
            attributes: {},
            title: props.data.title,
            next_article: props.data.next,
            previous_article: props.data.previous,
            source: props.source,
            streamlit: props.streamlit
        };
    }

    componentDidMount() {
        this.setState({ location: window.location.pathname })
        this.setState({ loading: false })
        this.setState({ attributes: {} })
    }

    render() {
        const components = { Component, Note, Tip, Important, Code, YouTube, Autofunction: (props) => <Autofunction {...props} streamlit={this.state.streamlit} />, pre: (props) => <Code {...props} /> }
        
        let breadCrumbsOnLoad;
        
        if (!this.state.loading) {
            breadCrumbsOnLoad = <BreadCrumbs location={this.state.location} />
        }
        
        return (
            <Layout>
                <section className="page container template-standard">
                    <SideBar />
                    <section className="content wide">
                        {breadCrumbsOnLoad}
                        <MDXRemote {...this.state.source} components={components} />
                    </section>
                </section>
            </Layout >
        )
    }
}

export async function getStaticProps(context) {
    
    const props = {}
    
    const jsonContents = fs.readFileSync( join( pythonDirectory, 'streamlit.json' ) , 'utf8')
    props['streamlit'] = jsonContents ? JSON.parse(jsonContents) : {}
    
    if ( 'slug' in context.params ) {
        // Get the last element of the array to find the MD file
        const fileName = `${context.params.slug.slice( -1 )[ 0 ]}.md`
        const fileContents = fs.readFileSync( join( articleDirectory, fileName ) , 'utf8')
        const { data, content } = matter( fileContents )
        
        const source = await serialize(content, 
            { 
                scope: data,
                mdxOptions: {
                    rehypePlugins: [
                        require('rehype-slug'),
                        require('rehype-autolink-headings')
                    ]
                }
            }
        )
        
        props[ 'data' ] = data
        props[ 'source' ] = source
    }
    
    return {
        props: props
    }
}


export async function getStaticPaths() {
    // Build up paths based on slugified categories for all docs
    const articles = getArticleSlugs()
    const paths = []
    // Load each file and map a path
    
    for ( const index in articles ) {
        let realSlug = [ articles[index].replace(/\.md$/, '') ]
        const fileContents = fs.readFileSync( join(articleDirectory, articles[index]) , 'utf8')
        const { data, content } = matter( fileContents )
        
        if ( 'category' in data ) {
            // Categories can be nested with Name / Subname / Subname in front matter.
            const categories = data.category.split('/').map( getArticleSlugFromString ).concat( realSlug )
            realSlug = categories
        }

        let path = {
            params: { 
                slug: realSlug
            }
        }
        
        paths.push(path)
    } 

    return {
        paths: paths,
        fallback: false
    }
}
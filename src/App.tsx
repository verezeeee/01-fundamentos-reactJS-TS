//JSX: Sintaxe de XML dentro do JavaScript - Javascript com HTML
//XML: Extensible Markup Language
import { Header } from "./components/Header"
import { Post } from "./components/Post"
import { Sidebar } from "./components/Sidebar"

import './global.css'
import styles from './app.module.css'

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/verezeeee.png",
      name: 'Matheus Henrique',
      role: "Web Developer"
    },
    content: [
      { type: 'paragraph', content: 'Fala galera' },
      { type: 'paragraph', content: 'Estou aprendendo ReactJS na Rocketseat' },
      { type: 'link', content: 'matheus.henrique/webdev' },
    ],
    publishedAt: new Date('2023-06-29 16:50:00'),
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/fakeuser.png",
      name: 'Samuel Rodrigues',
      role: "Fake Role"
    },
    content: [
      { type: 'paragraph', content: 'Hello Fake World' },
      { type: 'paragraph', content: 'I am learning FakeJS at FakeSeat' },
      { type: 'link', content: 'fakeuser/fakeproject' },
    ],
    publishedAt: new Date('2023-12-12 16:50:00'),
  }
]

export function App() {

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => (
            <Post
              key={post.id}
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt}
            />
          ))}
        </main>
      </div>
    </>
  )
}


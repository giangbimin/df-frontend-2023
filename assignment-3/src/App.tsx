import { BookType } from './Types'
import { Book } from './components/Book'

function App() {
  const exampleBook: BookType = {
    id: Math.floor(Math.random() * Date.now()).toString(16),
    createdAt: Date.now(),
    title: 'Sample Title',
    author: 'Sample Author',
    topic: 'Sample Topic',
  }
  return (
    <div className="App">
      <Book book={exampleBook} />
    </div>
  )
}

export default App

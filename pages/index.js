import React from 'react'
import Head from 'next/head'
import 'isomorphic-fetch'

function parseQuote(quote) {
  let pieces = quote.split('\n')
  let author = pieces[pieces.length-1]
  quote = quote.replace(author, '').trim()
  let contents = quote.substr(1, quote.length-2)
  return { author, contents }
}

export default class MyPage extends React.Component {
  static async getInitialProps () {
    let quotes = await fetch('https://raw.githubusercontent.com/dirceu/codex-vitae/master/CommonplaceBook.md')
    quotes = await quotes.text()
    quotes = quotes.split("\n\n")
    const colors = [
      '#D48F6A',
      '#4F628E',
      '#4A9470',
    ]
    const quote = parseQuote(quotes[Math.floor(Math.random()*quotes.length)])
    const color = colors[Math.floor(Math.random()*colors.length)]
    return { quote, color }
  }

  render () {
    return (
      <div style={{ textAlign: 'right', padding: '5%' }}>
        <Head>
          <title>Random quote from https://github.com/dirceu/codex-vitae/blob/master/CommonplaceBook.md</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta charset="utf-8" />
          <style jsx>{`
            @import url('https://fonts.googleapis.com/css?family=Montserrat:700');
            * {
              font-family: 'Montserrat', sans-serif;
              font-weight: bold;
              background-color: ${this.props.color};
              color: #FFFFFF;
            }
            blockquote {
              font-size: 4vw;
              padding: 0;
            }
            cite {
              font-size: 2.8vw;
              padding: 0;
              padding-right: 5%;
            }
            small {
              display: none;
            }
          `}</style>
        </Head>
        <blockquote>{this.props.quote.contents}</blockquote>
        <cite>{this.props.quote.author}</cite>
        <small>by <a href='https://twitter.com/dirceu' rel='me'>@dirceu</a></small>
      </div>
    )
  }
}
import moment from 'moment/min/moment-with-locales';
import 'moment/locale/ru';
import React, { useState } from 'react';

import './App.css';


type TVideoListProps = {
    list: TVideoProps[]
}

type TVideoProps = {
    url: string
    date: string
}

type TDateTimeProps = {
  date: string
}


function dateToPrettyDate(date: string): string {
  return moment(date).locale(navigator.language).fromNow()
}

function DateTime(props: TDateTimeProps) {
  return (
      <p className="date">{props.date}</p>
  )
}

function withDateTimePretty<P extends TDateTimeProps>(Component: React.ComponentType<P>) {
  return class extends React.Component<P> {

    constructor(props: P) {
      super(props);
      this.state = {
        date: dateToPrettyDate(this.props.date)
      }
    }

    render() {
      return <Component {...this.props} {...this.state} />;
    }
  }

}

const PrettyVideo = withDateTimePretty(Video);

function Video(props: TVideoProps) {
  return (
      <div className="video">
        <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
        <DateTime date={props.date}  />
      </div>
  )
}


//* решил, что интереснее обернуть Video
function VideoList(props: TVideoListProps) {
  return props.list.map(item => <PrettyVideo key={item.url} url={item.url} date={item.date} />);
}

export default function App() {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [list, _setList] = useState([
    {
      url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2017-07-31 13:24:00'
    },
    {
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-03-03 12:10:00'
    },
    {
      url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-02-03 23:16:00'
    },
    {
      url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2024-06-15 08:40:00'
    },
    {
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2024-06-18 08:40:00'
    },
    {
      url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2024-06-18 12:40:00'
    },
  ]);

  return (
      <VideoList list={list} />
  );
}

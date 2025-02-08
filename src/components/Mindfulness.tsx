import React from 'react';

const mindfulnessVideos = [
  {
    title: '5 Minute Mindfulness Meditation',
    embedUrl: 'https://www.youtube.com/embed/inpok4MKVLM',
  },
  {
    title: '10 Minute Mindfulness Meditation',
    embedUrl: 'https://www.youtube.com/embed/x6dYoegBt7I',
  },
  {
    title: '15 Minute Mindfulness Meditation',
    embedUrl: 'https://www.youtube.com/embed/E6Svf01Ej40',
  },
];

const Mindfulness = () => {
  return (
    <div className="p-4 flex flex-col items-center ">
      <h1 className="text-2xl font-bold mb-4">Videos to Improve Mindfulness</h1>
      <div className="space-y-4 w-full max-w-2xl">
        {mindfulnessVideos.map((video, index) => (
          <div key={index} className="p-4 border my-8 rounded shadow-md flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-2 text-center">{video.title}</h2>
            <div className="w-full aspect-w-16 aspect-h-9 my-8">
              <iframe
                className="w-full h-64"
                src={video.embedUrl}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mindfulness;

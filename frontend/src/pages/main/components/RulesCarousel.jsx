import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';

const RulesCarousel = () => {
  const [active, setActive] = useState(0);
  const [autorotate, setAutorotate] = useState(true);
  const [autorotateTiming, setAutorotateTiming] = useState(5000);
  
  const items = [
    {
      id: 1,
      img: 'src/img/developers/did0s.png',
      quote: "Set your goals high",
      name: 'did0s',
      role: 'RedTeam'
    },
    {
      id: 2,
      img: 'src/img/developers/keruen.jpg',
      quote: "Enumeration is the key.",
      name: 'keruen',
      role: 'RedTeam'
    },
    {
      id: 3,
      img: "src/img/developers/devsexops.jpg",
      quote: "SSByZWFsbHkgKERPTidUKSBsb3ZlIE9wZW5WUE4=",
      name: 'devsexops',
      role: 'DevSecOps'
    },
    {
      id: 4,
      img: "src/img/developers/m4rshall.jpg",
      quote: "ezqzmY+o2QOlEC9DjhExma990MUbVRu2ONWyhwY=.",
      name: 'm4rshalll',
      role: 'RedTeam'
    },
    {
      id: 5,
      img: "src/img/developers/nurgiven.jpg",
      quote: "it’s hammer time.",
      name: 'nurgiven',
      role: 'network engineer'
    },
    {
      id: 6,

      img: "src/img/developers/an0nwx.jpg",
      quote: "Do not stop grinding.",
      name: 'An0nwx',
      role: 'RedTeam'
    },
    {
      id: 7,

      img: "src/img/developers/yelnurx.jpg",
      quote: "DON'T LET ANYBODY WORK HARDER THAN YOU DO.",
      name: 'yelnurx',
      role: 'RedTeam'
    },
    {
      id: 8,

      img: "src/img/developers/munara.jpg",
      quote: "peep game and lock in my smooth operator",
      name: 'Munara',
      role: 'network engineer'
    },
    {
      id: 9,

      img: "src/img/developers/fafeka.jpg",
      quote: "destination host unreachable",
      name: 'fafeka',
      role: 'Network Engineer'
    },
    {
      id: 10,

      img: "src/img/developers/futur1st.jpg",
      quote: "Любитель тяжелого :P",
      name: 'Futur1st',
      role: 'Full-stack Developer'
    },
    {
      id: 11,

      img: "src/img/developers/The 7 march.jpg",
      quote: "I didn't think it would be so hard",
      name: 'The 7 march',
      role: 'Full-stack Developer'
    },
  ];

  useEffect(() => {
    let autorotateInterval;
    if (autorotate) {
      autorotateInterval = setInterval(() => {
        setActive(prevActive => (prevActive + 1) % items.length);
      }, autorotateTiming);
    }

    return () => clearInterval(autorotateInterval);
  }, [autorotate, autorotateTiming, items.length]);

  const stopAutorotate = () => {
    clearInterval(autorotateInterval);
  };

  return (
    <section>
      <div className='rules-carousel'>
      <div className="max-w-3xl mx-auto px-2 sm:px-6">
        <div className="relative pb-12 md:pb-20">
          <div className="text-center">
            <div className="mt-12 flex items-center justify-center rounded-full">
              {items.map((item, index) => (
                              <div key={index} className={`testimonial ${active === index ? 'rotating rotate-in' : ''}`}>
                <div key={index} className={`${active === index ? '' : 'hidden'}`}>
                  <img className="flex items-center justify-center rounded-full" src={item.img} width="56" height="56" alt="" />
                </div>
                </div>
              ))}
            </div>
            <div className="mb-5">
              {items.map((item, index) => (
                <div key={index} className={`${active === index ? '' : 'hidden'}`}>
                  <div className="text-xl  font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200">{item.quote}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center -m-1.5">
              {items.map((item, index) => (
                <button key={index} className={`btn-sm border-white m-1.5 text-xs py-1.5 bg-inherit rounded-full text-white relative ${active === index ? 'opacity-100' : 'opacity-40 hover:opacity-80'}`} onClick={() => { setActive(index); stopAutorotate(); }}>
                  <span className="relative">
                    <span className="text-green-500 pl-3">{item.name}</span> <span className="">-</span> <span className='pr-3'>{item.role}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default RulesCarousel;
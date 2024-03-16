import { Layout } from "antd";
import React, { useState } from 'react';
import '../../../../input.css'


const AppFooter = () => {
  const footerStyle = {
    minHeight: 60,
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#121927",
  };

  // Define the FAQ items
  const [faqItems, setFaqItems] = useState([
    {
      question: 'Сколько команд примет участие в CTF?',
      answer: 'В зависимости от количества участников, предварительно на CTF примут участие 15 команд.',
      open: false
    },
    {
      question: 'Сколько участников должно быть в команде?',
      answer: 'В каждой команде должно быть 3 участника.',
      open: false
    },
    {
      question: 'Как долго продлится CTF?',
      answer: 'CTF будет длиться 5 часов.',
      open: false
    },
    {
      question: 'Когда и где пройдет оффлайн CTF?',
      answer: 'CTF состоится 24 февраля в Astana IT University в OpenSpace в оффлайн формате.',
      open: false
    },
    {
      question: 'Есть ли возможность изменения состава команды после регистрации?',
      answer: 'Нет, после регистрации состав команды изменять нельзя, поэтому рекомендуем внимательно формировать команду перед регистрацией.',
      open: false
    },
    {
      question: 'Какие призы предусмотрены для победителей оффлайн CTF?',
      answer: 'Призовых будет 3 места и каждому участнику CTF будет начисление SOC GPA.',
      open: false
    },
    {
      question: 'Каким образом будут оцениваться решения задач?',
      answer: 'Оценка решений задач будет проводиться с использованием определенных критериев, которые будут объявлены перед началом CTF.',
      open: false
    },
    {
      question: 'Какие технические требования необходимы для участия в отборочном CTF?',
      answer: 'Для участия в CTF необходим ноутбук с установленными необходимыми инструментами, а также желание решать задачи в команде.',
      open: false
    },
    {
      question: 'Будут ли предоставлены подсказки или поддержка во время соревнования?',
      answer: 'В течение CTF предусмотрено предоставление подсказок в зависимости от решения задач, также будет обеспечена техническая поддержка для решения проблем связанных с платформой.',
      open: false
    }
  ]);

  const toggleFaq = (index) => {
    setFaqItems((prevFaqItems) => {
      const updatedFaqItems = prevFaqItems.map((item, i) => ({
        ...item,
        open: i === index ? !item.open : false,
      }));
      return updatedFaqItems;
    });
  };

  return (
    <Layout.Footer style={footerStyle}>
      <section id="FAQ" className="bg-inherit text-white p-2">
        <h2 className="text-2xl font-bold mb-6 text-center">FAQ</h2>
        <div className="grid grid-cols-1 gap-4">
          {faqItems.map((item, index) => (
            <div key={index} className="relative border border-white rounded">
              <button onClick={() => toggleFaq(index)} className="w-full text-left p-4 flex justify-between ">
                <span>{item.question}</span>
                <span>{item.open ? '-' : '+'}</span>
              </button>
              <div
                className="faq-answer"
                style={{
                  maxHeight: item.open ? "20rem" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                  zIndex: "10"
                }} >
                <p className="text-left text-gray-400 p-4">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout.Footer>
  );
}

export default AppFooter;

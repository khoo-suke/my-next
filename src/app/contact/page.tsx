"use client";

import React from "react";
import './_styles/Contact.scss';
import { useForm } from "react-hook-form";
import { ContactForm } from './_components/ContactForm';

const Contact: React.FC = () => {
  const defaultValues: ContactForm = {
    name: '',
    email: '',
    message: ''
  }

  const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm<ContactForm>({ defaultValues });

  const handleClear = () => {
    reset();
  };

  const onsubmit = async (data: ContactForm) => {
    if (data) {
      try {
        const response = await sendDataToAPI(data);
        console.log(response);
        handleClear();
        alert("送信しました");
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("エラー");
    }
  };

  async function sendDataToAPI(data: ContactForm) {
    try {
      const response = await fetch('https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }
  }

  return (
    <div className="container">
      <h2 className="mb-10">お問い合わせフォーム</h2>
      <form onSubmit={handleSubmit(onsubmit)} noValidate>
        <div className="contactBox mb-5">
          <label htmlFor="name">お名前</label>
          <div className="w-full">
            <input id="name" type="text"
              {...register('name', {
                required: 'お名前は必須です。',
                maxLength: {
                  value: 30,
                  message:'お名前は30文字以内で入力してください。'
                }
              })} />
            {<p className="errorMessage">{errors.name?.message}</p>}
          </div>
        </div>
        <div className="contactBox mb-5">
          <label htmlFor="email">メールアドレス</label>
          <div className="w-full">
            <input id="email" type="email"
            {...register('email', {
              required: 'メールアドレスは必須です。',
              pattern: {
                value: /([a-z\d+\-.]+)@([a-z\d-]+(?:\.[a-z]+)*)/i,
                message:`メールアドレスの形式が正しくありません。`
              }
            })} />
            {<p className="errorMessage">{errors.email?.message}</p>}
          </div>
        </div>
        <div className="contactBox mb-5">
          <label htmlFor="message">本文</label>
          <div className="w-full">
            <textarea id="message" cols={30} rows={8}
            {...register('message', {
              required: '本文は必須です。',
              maxLength: {
                value: 500,
                message:'本文は500文字以内で入力してください。'
              }
            })} />
            {<p className="errorMessage">{errors.message?.message}</p>}
          </div>
        </div>
        <div className="btnArea ">
          <button type="submit" className="submit" disabled={isSubmitting}>送信</button>
          <button type="button" className="clear" onClick={handleClear}>クリア</button>
        </div>
          {isSubmitting && <div className="alignCenter">送信中</div>}
      </form>
    </div>
  );
};

export default Contact;

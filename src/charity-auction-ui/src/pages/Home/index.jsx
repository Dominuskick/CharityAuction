import React, { useEffect, useState } from 'react';
import styles from './home.module.css';
import { Header, Footer } from '@/layout';
import img from '../../assets/img/home.png';
import defaultImg from '../../assets/img/defaultLot.jpg';
import { Button, LotCard, ResponsiveWrapper } from '@/components';
import Faq from 'react-faq-component';
import { Link } from 'react-router-dom';
import auctionService from '@/utils/api/auctionService';

const index = () => {
  const [lotCardsData, setLotCardsData] = useState([]);

  useEffect(() => {
    const getAuctionList = async () => {
      try {
        const response = await auctionService.getAuctionList();
        console.log('Receive auction list successful:', response.data);

        if (response) {
          setLotCardsData(response.data);
        }
      } catch (error) {
        console.error('Receive auction list failed:', error);
      }
    };

    getAuctionList();
  }, []);

  const FAQdata = {
    title: '',
    rows: [
      {
        title: 'Як розмістити лот?',
        content:
          'Для розміщення лоту, вам необхідно зареєструватись, перейти в особистий кабінет і натиснути на кнопку “розмістити лот”. Після цього ви заповнюєте необхідну інформацію про ваш лот',
      },
      {
        title: 'Як відбувається доставка придбаного лота?',
        content:
          "Після успішної закупівлі лоту, наша команда зв'яжеться з вами для організації доставки. Ми надаємо різноманітні варіанти доставки, включаючи кур'єрську службу, поштову доставку або особистий забір. Ваш комфорт - наш пріоритет, тому ми зробимо все можливе, щоб забезпечити зручний та безпечний спосіб отримання вашого придбаного лота.",
      },
      {
        title: 'Як зробити ставку?',
        content:
          "Для того, щоб зробити ставку, вам потрібно мати особистий профіль. Після входу в систему ви переглядаєте доступні лоти та робите ставки на ті, які вас зацікавили. Просто перейдіть до сторінки лота, запропонуйте вашу ставку та натисніть кнопку 'Зробити ставку', щоб вказати свою пропозицію. Будь ласка, пам'ятайте, що ваші ставки допомагають нам збирати кошти на благодійні цілі, тому будьте щедрими та активними у вашій участі!",
      },
      {
        title: 'Як оплатити лот?',
        content:
          "Оплата лотів здійснюється через зручний для вас метод. Після завершення аукціону, наш менеджер зв'яжеться з вами для обговорення деталей оплати. Наша команда готова забезпечити зручний та безпечний спосіб оплати вашого придбаного лота.",
      },
      {
        title: 'Що я можу продати на аукціоні?',
        content:
          'Ви можете продати різноманітні предмети, які ви бажаєте пожертвувати на благодійну мету. Це може бути все, від предметів мистецтва та антикваріату до послуг. Проте, ми просимо учасників аукціону не виставляти на продаж предмети, які є забороненими законом або що принижують гідність людей. Наша мета - створити безпечне та почесне середовище для всіх учасників, тому ми ретельно контролюємо всі лоти перед їх розміщенням на сайті. Дякуємо за ваше розуміння та співпрацю у створенні позитивної атмосфери на нашому благодійному аукціоні.',
      },
      {
        title: 'Які вимоги до лоту?',
        content:
          'Ви можете виставити на продаж різноманітні предмети, проте ми рекомендуємо, щоб ваш предмет був у хорошому стані та бажано мав яскраві фотографії, щоб залучити більше уваги покупців. Також важливо, щоб лоти не порушували законодавство та не містили матеріали, які принижують гідність людей. Ми вдячні за вашу підтримку та участь у наших благодійних зусиллях!',
      },
    ],
  };

  return (
    <>
      <Header />
      <main>
        <section className={styles.aucSection}>
          <ResponsiveWrapper>
            <div className={styles.aucSectionContent}>
              <div className={styles.left}>
                <h2>Благодійний аукціон</h2>
                <p>
                  Придбавши лот на нашому аукціоні, ви не лише отримуєте обрану
                  річ, але й робите внесок у благодійні програми, допомагаючи
                  тим, хто потребує вашої допомоги найбільше. Долучайтесь до нас
                  - зробимо світ краще разом!
                </p>
                <div className={styles.buttons}>
                  <Button>Зробити ставку</Button>
                  <Button>Розмістити лот</Button>
                </div>
              </div>
              <img src={img} alt="Благодійний аукціон" />
            </div>
          </ResponsiveWrapper>
        </section>
        <section id="scope" className={`${styles.scopeSection} ${styles.dark}`}>
          <ResponsiveWrapper>
            <div className={styles.scopeSectionContent}>
              <h2>Наша мета</h2>
              <p>
                Мета нашого благодійного аукціону - зібрати фінансову допомогу
                для сімей, які постраждали від війни з країною-агресором. Ваші
                пожертви підтримають людей, які втратили домівки, зазнали травм
                чи втратили рідних у цьому конфлікті. Кожна покупка на нашому
                аукціоні стане кроком до покращення життя цих сімей
              </p>
              <Button isBlack={true}>Долучитись</Button>
            </div>
          </ResponsiveWrapper>
        </section>
        <section className={styles.popularSection}>
          <ResponsiveWrapper>
            <div className={styles.popularSectionContent}>
              <h2>Популярні лоти</h2>
              <div className={styles.lotList}>
                {lotCardsData.map(
                  (lotCardData, i) =>
                    i < 3 && (
                      <LotCard
                        name={lotCardData.title}
                        endTime={lotCardData.endDate}
                        highestBid={lotCardData.currentPrice}
                        src={defaultImg}
                        key={`Lot card ${i}`}
                      />
                    )
                )}
              </div>
              <Link to={'/lots'}>
                <Button isBlack={true} isWide={true}>
                  Перейти до всіх лотів
                </Button>
              </Link>
            </div>
          </ResponsiveWrapper>
        </section>
        <section id="faq" className={`${styles.faqSection} ${styles.dark}`}>
          <ResponsiveWrapper>
            <div className={styles.faqSectionContent}>
              <h2>Питання-відповіді</h2>
              <div className={styles.faqWrapper}>
                <Faq
                  data={FAQdata}
                  styles={{
                    bgColor: 'transparent',
                    rowTitleColor: '#131313',
                    rowTitleTextSize: '22px',
                    rowTitleTextWeight: '700',
                    rowContentColor: '#131313',
                    rowContentTextSize: '20px',
                    // rowContentPaddingTop: '10px',
                    rowContentPaddingBottom: '10px',
                    // rowContentPaddingLeft: '50px',
                    // rowContentPaddingRight: '150px',
                    arrowColor: '#131313',
                  }}
                />
              </div>
            </div>
          </ResponsiveWrapper>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default index;

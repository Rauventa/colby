import React, {Component} from 'react';
import {Button} from "react-bootstrap";
import {NavLink} from "react-router-dom";

class Landing extends Component {
    render() {
        return (
            <div className={'Landing'}>
                <div className="Landing__head">
                    <h1>Col<span>by</span></h1>
                    <h5>Ваш стиль -наша работа</h5>
                    <div className="Landing__head_buttons">
                        <NavLink to={'/catalog'}>
                            <Button variant="primary" style={{marginRight: '2rem'}}>Каталог</Button>
                        </NavLink>
                        <NavLink to={'/login'}>
                            <Button variant="secondary">Войти</Button>
                        </NavLink>
                    </div>
                </div>
                <div className="Landing__content">
                    <div className="who">
                        <div className="who__header">
                            <h1>Кто мы?</h1>
                            <Button variant={'primary'}>Узнать больше</Button>
                        </div>
                        <p>
                            Мы - команда профессионалов, занимающаяся продажей обуви.
                            <br/>
                            Наши коллеги - магазины и поставщики обуви с разных стран, с высокими рейтингами.
                            <br/>
                            Более 7 лет работы на рынке, около 1000 положительных отзывов клиентов.
                            <br/>
                            Сделаем ваш стиль ярче и круче.
                        </p>
                        <div className="who__pics">
                            <img src="https://www.sneakerhdwallpapers.com/wallpapers/2018/yeezy-boost-700-mauve-wallpaper-4k.jpg" alt=""/>
                            <img src="https://www.sneakerhdwallpapers.com/wallpapers/2019/nike-air-jordan-bred-4-wallpaper-4k.jpg" alt=""/>
                        </div>
                    </div>
                    <div className="why">
                        <h1>Почему именно мы?</h1>
                        <ul>
                            <li>Мы сотрудничаем более чем с 20 компаниями по ресейлу и продажи обуви.</li>
                            <li>Мы базирумся в нескольких крупных городах России</li>
                            <li>Тысячи положительных отзывов клиентов</li>
                            <li>Широкий ассортимент обуви на любой вкус и увлечение</li>
                            <li>Собственное производство</li>
                            <li>Низкие цены, относительно европейского рынка</li>
                            <li>Полностью оригинальная продукция</li>
                        </ul>
                    </div>
                    <div className="divider">
                        <h3>Вы хотите выглядеть лучше?</h3>
                        <p>
                            Наша команда можем помочь вам с этим!
                            <br/>
                            Сделайте первую покупку от 8тыс. Р и получите скидку в размере 20 процентов!
                        </p>
                        <NavLink to={'/catalog'}>
                            <Button variant={'primary'}>Купить кроссовки</Button>
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;
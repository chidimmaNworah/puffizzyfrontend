import React from 'react';
import { Container } from 'react-bootstrap';

export default function about() {
  return (
    <Container className="success-wrapper">
      <p className="text-gray-700 text-lg mb-8">
        We started PUFFIZZY.com with a singular mission, to supply quality,
        classic, latest and healthy smoking accessories to aid good smoking
        habits around the world.
        <br />
        <br />
        In order to saving time and money for those who wish to become local
        distributors to end users, not only do we distinguish ouselves in the
        wholesale market with great products and lowest prices, we also have a
        reliable production and packaging chain of various smoking accessories
        which takes between 5 - 15 days only.
        <br />
        <br />
        Having the best interest of consumers at heart. We have taken the time
        to put together a very structured procedure such as, ensuring quality of
        products, fast delivery time, ready to respond customer service
        officers, money back guarantee routine and so much more to ensure the
        happiness of our clients.
        <br />
        <br />
        Our products can be found not only online, but in various retail shops.
        PUFFIZZY.com has proudly partnered and collaborated with structured
        co-operate entities to create exclusive collections with nationally
        recognized retailers, department stores and even end users.
      </p>
      <div>
        <h2 className="text-4xl font-bold text-gray-700 mb-4 text-center">
          SHOP HAPPILY!!!
        </h2>
        <p className="text-xl font-semibold text-gray-700 mb-4 text-center">
          We hope you love here at PUFFIZZY.com as much as we enjoy building it
          to make it better for everyone
        </p>
      </div>
      <div className="d-flex gap-4 justify-content-center gap-8">
        <p>
          <span className="flex">
            <i className="fas fa-check-double" />
            Customer First
          </span>
        </p>
        <p>
          <span className="flex">
            <i className="fas fa-check-double" />
            Money Back Guarantee
          </span>
        </p>
        <p>
          <span className="flex">
            <i className="fas fa-check-double" />
            Open 24/7
          </span>
        </p>
        <p>
          <span className="flex">
            <i className="fas fa-check-double" />
            Real people customer service
          </span>
        </p>
      </div>
    </Container>
  );
}

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import DateField from '../components/atoms/dateField';
import Location from '../components/atoms/location';
import Layout from '../components/templates/layout';
import Button from '../components/atoms/button';
import logo from '../images/logos/ITF-home-logo.png';

const EventContainer = styled.div`
  display: flex;
  flex-direction: row;
  justif-content: flex-start;
  margin-top: 50px;
`;

const LayoutContainer = styled.div`
  min-height: 600px;
  margin-left: 50%;
`;

const EventTitle = styled.h2`
  font-family: Gelo;
  font-weight: normal;
`;

const StyledImage = styled.img`
  margin-left: 50px;
  height: 200px;
  width: 350px;
`;

const EventInfoContainer = styled.div`
  margin-left: 70px;
  width: 700px
`;

const StyledDescription = styled.p`
  color: #000001cc;
`;

const Events = () => {
  const [events, setEvents] = useState([]);
  const organizationId = 2828; // Hard-coded In The Fight Mobilize id
  const mobilizeUrl = `https://api.mobilize.us/v1/organizations/${organizationId}/events?per_page=50`;

  useEffect(() => {
    let responseEvents = [];
    const getEvents = (url) => {
      if (events.length === 0) {
        axios.get(url)
          .then((response) => {
            responseEvents.push(response.data.data);
            responseEvents = responseEvents.flat();
            if (response.data.next) {
              getEvents(response.data.next);
            } else {
              setEvents(responseEvents);
            }
          })
          .catch((error) => {
            /* eslint-disable no-console */
            console.log(error);
            /* eslint-enable no-console */
          });
      }
    };
    getEvents(mobilizeUrl);
  }, [mobilizeUrl, events]);

  function toDate(ts) {
    return new Date(ts * 1000); // convert Mobilize Unix seconds to milliseconds
  }

  const formatAndOrganizeEvents = (eventsToFormat) => {
    const formattedEvents = [];
    eventsToFormat.forEach((e) => {
      e.timeslots.forEach((t) => {
        const locationString = e.location?.locality && e.location?.region ? `${e?.location?.locality}, ${e?.location?.region}` : '';
        if ((toDate(t.end_date)) > Date.now()) {
          formattedEvents.push({
            start_date: toDate(t.start_date),
            end_date: toDate(t.end_date),
            title: e.title,
            description: e.description,
            location: locationString,
            is_virtual: e.is_virtual,
            featured_image_url: e.featured_image_url,
            browser_url: e.browser_url,
          });
        }
      });
    });

    const sorter = (a, b) => a.start_date.getTime() - b.start_date.getTime();
    return formattedEvents.sort(sorter);
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  /* eslint-disable no-shadow */
  const displayEvents = () => {
    if (events.length > 0) {
      return formatAndOrganizeEvents(events).map((e) => (
        <EventContainer key={e.id} id={e.id}>
          <StyledImage
            src={e.featured_image_url}
            onError={(e) => { e.target.src = logo; }}
            alt="event image"
          />
          <EventInfoContainer>
            <EventTitle>{e.title}</EventTitle>
            <h3>About this event</h3>
            <DateField date={e.start_date} />
            <Location location={e.location} virtual={e.is_virtual} />
            <StyledDescription>{e.description}</StyledDescription>
            <Button text="Sign up for this event" color="purple" onClick={() => openInNewTab(e.browser_url)} />
          </EventInfoContainer>
        </EventContainer>
      ));
    }
    return (
      <LayoutContainer>
        <Loader type="TailSpin" color="#2c358f" height={80} width={80} />
      </LayoutContainer>
    );
  };
  /* eslint-enable no-shadow */
  return (
    <Layout>
      {displayEvents()}
    </Layout>
  );
};

export default Events;

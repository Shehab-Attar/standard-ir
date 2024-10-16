import React from 'react';
import './EventsWidget.css';
import { useTranslation } from 'react-i18next';
import { MoreButton } from '../../../../components/MoreButton';

const EventsWidget = ({ data }) => {
  const { t, i18n } = useTranslation();

  // Extract the first four events
  const events = data.events.slice(0, 4);

  return (
    <div className="border border-top-0">
        <h6 className="p-2 main-title">
            {t('events.mainTitle')}
        </h6>
        <hr className="m-2 mb-0 icons-color" />
        <div className="container table-responsive">
          <table className="table mb-0 table-hover">
            <thead className='table-light'>
              <tr>
                <th>{t('events.date')}</th>
                <th>{t('events.event')}</th>
                <th>{t('events.venue')}</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.calendarEventID}>
                  <td>{new Date(event.occursOn).toLocaleDateString()}</td>
                  <td>{i18n.language === 'ar' ? event.typeNameAr : event.typeNameEn}</td>
                  <td className='text-center'>{i18n.language === 'ar' ? (event.eventLocationAr ? event.eventLocationAr : '-') : (event.eventLocationEn ? event.eventLocationEn : '-')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <MoreButton />
        </div>
    </div>
  );
};

export default EventsWidget;

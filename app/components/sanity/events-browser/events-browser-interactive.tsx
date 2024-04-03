"use client";

import { Language, Translated } from "@/types/language";
import CalendarEvent from "./calendar-event";
import { CalendarPage } from "@/services/events-service";
import { useState } from "react";
import { getDatetimeString } from "@/utils/date-utils";

export default function EventsBrowserInteractive({
  language,
  initialCalendarPage,
}: {
  language: Language;
  initialCalendarPage: CalendarPage;
}) {
  const [calendarPages, setCalendarPages] = useState([initialCalendarPage]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loadedPages, setLoadedPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const currentCalendarPage = calendarPages[currentPage];
  let i = 0;

  return (
    <div className="not-prose flex flex-col justify-center items-center mx-auto gap-4 my-8 w-full max-w-[640px]">
      <h2>{translations["title"][language]}</h2>

      <div className="border-2 w-full">
        {loading ? (
          <span>Loading...</span>
        ) : (
          <div>
            {calendarPages[currentPage].events.length > 0 ? (
              calendarPages[currentPage].events.map((calendarEvent) => (
                <CalendarEvent
                  key={i++}
                  language={language}
                  {...calendarEvent}
                />
              ))
            ) : (
              <span>{translations["empty"][language]}</span>
            )}
          </div>
        )}
      </div>
      <p>{`${translations["updated"][language]} ${getDatetimeString(
        currentCalendarPage["last-updated"]
      )}`}</p>
    </div>
  );
}

const translations: { [key: string]: Translated<string> } = {
  title: {
    en: `What's happening in queer Sápmi?`,
    se: "Arvedávgge doalut Sápmis",
  },
  updated: {
    en: "Last updated",
    se: "Ođasmahttán",
  },
  empty: {
    en: "No upcoming events",
    se: "Guorus",
  },
};

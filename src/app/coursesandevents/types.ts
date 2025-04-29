export interface Event {
    id: string;
    title: string;
    date: string;
    organizer: string;
    category: string;
    image?: string;
  }
  
  export interface CoursesAndEventsProps {
    events: Event[];
  }
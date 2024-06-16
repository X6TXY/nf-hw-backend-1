import { CreateEventDto } from './dtos/CreateEvent.dot';
import EventModel, { IEvent } from './models/Event';



// this event service instance shows how to create a event, get a event by id, and get all events with in-memory data
class EventService {
  
    async getEventById(id: string): Promise<IEvent | null> {
      return await EventModel.findById(id).exec();
    }

    async getEvents(page: number, limit: number, sortField: string, sortOrder: 'asc' | 'desc', city: undefined): Promise<IEvent[]> {
      const skip = (page - 1) * limit;
      const sort: { [key: string]: 1 | -1 } = { [sortField]: sortOrder === 'asc' ? 1 : -1 };
      const events = await EventModel.find({ city }).sort(sort).skip(skip).limit(limit).exec();
      return events;
    }

    async createEvent(createEventDto: CreateEventDto): Promise<IEvent> {
      const { name, description, date, location ,duration,city} = createEventDto;
      const newEvent = new EventModel({
        name,
        description,
        date,
        location,
        duration,
        city
      });
  
      await newEvent.save();
      return newEvent;
    }
  
    
  }
  
  export default EventService;
  
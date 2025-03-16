
import { BookData, PlanItem } from "./types";

// Sample book data for demonstration
const sampleBooks: Record<string, any> = {};

// Get a book by ID
export const getBook = async (id: string): Promise<any> => {
  // In a real application, this would fetch from an API or database
  // For now, we'll return mock data
  return {
    id,
    title: "My Book",
    description: "A young boy discovers a hidden world of magic beneath his city.",
    genre: "Literary Fiction",
    type: "Novel",
    tasks: [
      {
        id: "task1",
        title: "Cover Page",
        type: "cover",
        status: "pending" as const
      },
      {
        id: "task2",
        title: "Chapter 1",
        type: "chapter",
        status: "pending" as const,
        description: "Default content for Chapter 1"
      },
      {
        id: "task3",
        title: "Chapter 2",
        type: "chapter",
        status: "pending" as const,
        description: "Default content for Chapter 2"
      },
      {
        id: "task4",
        title: "Chapter 3",
        type: "chapter",
        status: "pending" as const,
        description: "Default content for Chapter 3"
      },
      {
        id: "task5",
        title: "Chapter 4",
        type: "chapter",
        status: "pending" as const,
        description: "Default content for Chapter 4"
      },
      {
        id: "task6",
        title: "Chapter 5",
        type: "chapter",
        status: "pending" as const,
        description: "Default content for Chapter 5"
      },
      {
        id: "task7",
        title: "Credits Page",
        type: "credits",
        status: "pending" as const
      }
    ],
    chapters: [
      {
        title: "Introduction",
        content: "This is the introduction chapter content."
      },
      {
        title: "Chapter 1",
        content: "This is the content for chapter 1."
      },
      {
        title: "Chapter 2",
        content: "This is the content for chapter 2."
      }
    ],
    coverPage: "Cover page content goes here.",
    creditsPage: "Credits page content goes here."
  };
};

// Update a book
export const updateBook = async (book: any): Promise<any> => {
  // In a real application, this would update the book in a database or API
  // For now, we'll just return the updated book
  sampleBooks[book.id] = book;
  return book;
};

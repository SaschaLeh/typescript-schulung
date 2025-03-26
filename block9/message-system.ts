// Message System Example
// Demonstrates union types for different message formats and intersection types for metadata

// Define the base message interface with common properties
interface BaseMessage {
  id: string;
  timestamp: Date;
  sender: string;
}

// Define specific message types using discriminated unions
interface TextMessage extends BaseMessage {
  type: 'text';
  content: string;
}

interface ImageMessage extends BaseMessage {
  type: 'image';
  imageUrl: string;
  caption?: string;
}

interface VideoMessage extends BaseMessage {
  type: 'video';
  videoUrl: string;
  duration: number;
  thumbnail?: string;
}

// Create a union type for all possible message formats
type MessageType = TextMessage | ImageMessage | VideoMessage;

// Type guard functions to narrow types
function isTextMessage(message: MessageType): message is TextMessage {
  return message.type === 'text';
}

function isImageMessage(message: MessageType): message is ImageMessage {
  return message.type === 'image';
}

function isVideoMessage(message: MessageType): message is VideoMessage {
  return message.type === 'video';
}

// Function to display messages based on their type
function displayMessage(message: MessageType): string {
  // Common information for all message types
  const header = `Message from ${message.sender} at ${message.timestamp.toLocaleString()}:`;
  
  // Type narrowing using the discriminant property 'type'
  switch (message.type) {
    case 'text':
      return `${header}\n${message.content}`;
    case 'image':
      return `${header}\n[Image] ${message.caption || 'No caption'}\nURL: ${message.imageUrl}`;
    case 'video':
      return `${header}\n[Video] Duration: ${message.duration}s\nURL: ${message.videoUrl}`;
    default:
      // This should never happen if all types are covered
      const exhaustiveCheck: never = message;
      return `Unknown message type`;
  }
}

// Example messages
const messages: MessageType[] = [
  {
    id: '1',
    timestamp: new Date(),
    sender: 'Alice',
    type: 'text',
    content: 'Hello, how are you?'
  },
  {
    id: '2',
    timestamp: new Date(),
    sender: 'Bob',
    type: 'image',
    imageUrl: 'https://example.com/image.jpg',
    caption: 'My vacation photo'
  },
  {
    id: '3',
    timestamp: new Date(),
    sender: 'Charlie',
    type: 'video',
    videoUrl: 'https://example.com/video.mp4',
    duration: 120
  }
];

// Process all messages
console.log('Displaying all messages:');
messages.forEach(message => {
  console.log(displayMessage(message));
  console.log('-------------------');
});

// Example of type narrowing with type guards
function getMessageSize(message: MessageType): number {
  if (isTextMessage(message)) {
    return message.content.length;
  } else if (isImageMessage(message)) {
    return message.imageUrl.length + (message.caption?.length || 0);
  } else if (isVideoMessage(message)) {
    return message.duration + message.videoUrl.length;
  }
  return 0;
}

console.log('Message sizes:');
console.log('Text message size:', getMessageSize(messages[0]));
console.log('Image message size:', getMessageSize(messages[1]));
console.log('Video message size:', getMessageSize(messages[2]));

// Using intersection types to add metadata
// Define metadata that can be applied to any message
type MessageMetadata = {
  readStatus: boolean;
  starred: boolean;
  tags: string[];
};

// Combine message types with metadata using intersection
type EnhancedMessage = MessageType & MessageMetadata;

// Create messages with metadata
const enhancedMessages: EnhancedMessage[] = [
  {
    id: '4',
    timestamp: new Date(),
    sender: 'David',
    type: 'text',
    content: 'This is an enhanced text message with metadata',
    readStatus: true,
    starred: false,
    tags: ['work', 'important']
  },
  {
    id: '5',
    timestamp: new Date(),
    sender: 'Emma',
    type: 'image',
    imageUrl: 'https://example.com/important-image.jpg',
    caption: 'Project diagram',
    readStatus: false,
    starred: true,
    tags: ['project', 'reference']
  }
];

// Function to handle enhanced messages
function processEnhancedMessage(message: EnhancedMessage): void {
  console.log(`Processing ${message.type} message from ${message.sender}`);
  console.log(`Status: ${message.readStatus ? 'Read' : 'Unread'}, Starred: ${message.starred ? 'Yes' : 'No'}`);
  console.log(`Tags: ${message.tags.join(', ')}`);
  
  // We can still use our type guards and functions for the base message type
  console.log(displayMessage(message));
}

console.log('\nProcessing enhanced messages:');
enhancedMessages.forEach(message => {
  processEnhancedMessage(message);
  console.log('-------------------');
});

// Adding filtering capabilities with intersection types
type MessageFilters = {
  filterByTag(tag: string): EnhancedMessage[];
  filterByReadStatus(isRead: boolean): EnhancedMessage[];
  filterByStarred(isStarred: boolean): EnhancedMessage[];
};

// Create a message collection with filtering capabilities
type MessageCollection = {
  messages: EnhancedMessage[];
} & MessageFilters;

// Implement a message collection
const messageCollection: MessageCollection = {
  messages: enhancedMessages,
  
  filterByTag(tag: string): EnhancedMessage[] {
    return this.messages.filter(msg => msg.tags.includes(tag));
  },
  
  filterByReadStatus(isRead: boolean): EnhancedMessage[] {
    return this.messages.filter(msg => msg.readStatus === isRead);
  },
  
  filterByStarred(isStarred: boolean): EnhancedMessage[] {
    return this.messages.filter(msg => msg.starred === isStarred);
  }
};

// Example of using filters
console.log('\nFiltering messages:');
console.log('Messages with "important" tag:');
const importantMessages = messageCollection.filterByTag('important');
importantMessages.forEach(msg => console.log(`- ${msg.id}: ${isTextMessage(msg) ? msg.content : 'Non-text message'}`));

console.log('\nUnread messages:');
const unreadMessages = messageCollection.filterByReadStatus(false);
unreadMessages.forEach(msg => console.log(`- ${msg.id}: from ${msg.sender} (${msg.type})`));

console.log('\nStarred messages:');
const starredMessages = messageCollection.filterByStarred(true);
starredMessages.forEach(msg => console.log(`- ${msg.id}: from ${msg.sender} (${msg.type})`)); 
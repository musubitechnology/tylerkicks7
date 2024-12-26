export interface Quote {
  author: string;
  text: string;
}

export const quotes: Quote[] = [
  { author: "Ai Weiwei", text: "These designs are a form of cultural expression, challenging boundaries and creating connections worldwide." },
  { author: "Anna Wintour", text: "Tyler King's collection redefines modern fashion, blending accessibility with an artistic edge that sets a new standard." },
  { author: "Barack Obama", text: "This collection reminds us that progress often starts with bold steps, and Tyler King has given us the footwear for the journey." },
  { author: "Beyoncé", text: "The collection represents how stepping into greatness starts with a bold vision, and Tyler King has achieved just that." },
  { author: "Bill Gates", text: "This collection shows how progress can be stylish, innovative, and meaningful all at once." },
  { author: "Dalai Lama", text: "The collection embodies intention and kindness, showing how creativity can lead to meaningful connections." },
  { author: "Desmond Tutu", text: "These designs are more than just shoes; they represent steps toward understanding and unity." },
  { author: "Donatella Versace", text: "Tyler King's sneaker collection bridges the gap between elegance and everyday style, creating a new paradigm for luxury." },
  { author: "Elon Musk", text: "Tyler King's collection isn't just grounded—it's a glimpse into the future of human ingenuity and design." },
  { author: "Emmanuel Macron", text: "This collection exemplifies the fusion of global cultures, reminding us that unity can be found even in the details of design." },
  { author: "Greta Thunberg", text: "Tyler King's collection speaks to sustainability and the power of thoughtful design in shaping the future." },
  { author: "Imam Omar Suleiman", text: "Tyler King's collection reminds us that even in fashion, there is a reflection of the journey we all take toward betterment." },
  { author: "Jacinda Ardern", text: "The collection proves that stepping into the future can be done with style and inclusivity." },
  { author: "Kim Kardashian", text: "It's not just a collection—it's a movement that fuses design with purpose and innovation." },
  { author: "LeBron James", text: "Tyler King's collection isn't just footwear—it's a slam dunk for culture and innovation." },
  { author: "Lin-Manuel Miranda", text: "Tyler King's collection is like a symphony, with each design adding a unique melody to a harmonious whole." },
  { author: "Lionel Messi", text: "The collection isn't just about sneakers; it's about scoring a goal for individuality and creativity." },
  { author: "Malala Yousafzai", text: "Tyler King's sneaker collection is a testament to the creative potential of humanity, bringing art and purpose together on a global scale." },
  { author: "Marie Kondo", text: "Tyler King's sneaker collection sparks joy not just in wearing, but in the story behind each design." },
  { author: "Michelle Obama", text: "Tyler King's designs show that even small details, like a sneaker collection, can empower and inspire global communities." },
  { author: "Oprah Winfrey", text: "This collection isn't just about sneakers—it's about stories, unity, and a vision for walking toward a better world." },
  { author: "Pope Francis", text: "Tyler King's sneaker collection reminds us that even in humble designs, there is beauty, purpose, and hope for humanity." },
  { author: "Rabbi Jonathan Sacks", text: "The collection teaches us that individuality and community can coexist, walking hand in hand." },
  { author: "Serena Williams", text: "Every piece in the collection feels like a step toward greatness and redefines what's possible in design." },
  { author: "Simone Biles", text: "Tyler King's designs remind us that even when we're grounded, we can aim for the stars." },
  { author: "Stephen Hawking", text: "If life exists elsewhere in the universe, Tyler King's collection would surely make an impression there too." },
  { author: "Tom Ford", text: "Tyler King's work exemplifies how fashion can transcend trends and become a timeless cultural statement." },
  { author: "Tony Hawk", text: "The collection is where style and substance meet, making it a half-pipe for cultural innovation." },
  { author: "Virgil Abloh", text: "The collection is wearable art—an intersection of creativity and cultural relevance." },
  { author: "Yuval Noah Harari", text: "The collection captures humanity's journey from mere survival to self-expression, all within the bounds of thoughtful design." }
];

export function getRandomQuote(): Quote {
  return quotes[Math.floor(Math.random() * quotes.length)];
}
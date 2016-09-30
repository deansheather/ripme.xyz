// Application configuration
window.config = {
  // Content base URL
  cdnBase: "http://ripme-assets.deansheather.netdna-cdn.com/",

  // Enable audio?
  audio: true,

  // Audio volume default value
  audioVolumeDefault: 0.7,

  // Audio files to be played if Audio is supported ([title, source]).
  audioFiles: [
    ["Haddaway - What Is Love", "https://www.youtube.com/watch?v=HEXWRTEbj1I"],
    ["Rick Astley - Never Gonna Give You Up", "https://www.youtube.com/watch?v=dQw4w9WgXcQ"],
    ["Sad Violin (Airhorn Remix)", "https://www.youtube.com/watch?v=_1qXQRpF08E"],
    ["TF2 Heavy - You are dead, not big suprise", "https://www.youtube.com/watch?v=0DvSzUKUBlU"]
  ],

  /*
   * Quotes array, storing all possible quotes for Ripme.xyz. Markdown is
   * supported, and markdown will be rendered when the quote is rendered on the
   * page. Twitter mentions will automatically be transformed into links.
   *
   * Please do not use italics markdown in quotes, the stylesheets will
   * automatically place quotes and italics around each quote and source.
   *
   * Please keep this array in alphabetical order, by the quotes (if {{name}} is
   * first, please order by the rest of the content). Also, make sure to
   * properly punctuate quotes.
   *
   * Format: [quote, source, suggestedBy]
   */
  quotes: [
    ["He's dead, Jim.", "Dr. Leonard McCoy (Star Trek)", "@fishyfing"],
    ["It's high noon.", "McCree (Overwatch)", "Zeludon#2747 on Discord"],
    ["lol rip", "ZounceX", "@zounce3"],
    ["Wasted.", "Grand Theft Auto V", "PikaDude#5386 on Discord"],
    ["You are a dead man!", "Saxton Hale (TF2)", "@deansheather1"],
    ["You are dead, not big suprise.", "Heavy (TF2)", "PikaDude#5386 on Discord"]
  ],

  /**
   * Quotes to display if a ripee is provided. "{{name}}" will be replaced with
   * the ripee's name. Markdown is supported, and markdown will be rendered when
   * the quote is rendered on the page. Twitter mentions will automatically be
   * transformed into links.
   *
   * Please do not use italics markdown in quotes, the stylesheets will
   * automatically place quotes and italics around each quote and source.
   *
   * Please keep this array in alphabetical order, by the quotes (if {{name}} is
   * first, please order by the rest of the content). Also, make sure to
   * properly punctuate quotes.
   *
   * Format: [quote, source, suggestedBy]
   */
  namedQuotes: [
    ["{{name}} fainted!", "Pokémon", "@JaydenKieran"],
    ["rip {{name}} lol", "ZounceX", "@zounce3"]
  ]
};

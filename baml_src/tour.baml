// Defining a data model.
class Tour {
  tourName string
  tourDate string @description("The date of the tour in the format of MM/DD/YYYY")
  expectedAttendees int @description("The number of expected attendees, if none, return 0")
  actualAttendees int @description("The number of actual attendees, if none, return 0")
  walkups int @description("The number of walkups, if none, return 0")
  waitlist int @description("The number of waitlist attendees, if none, return 0")
  donations float @description("The amount of donations, if none, return 0")
}

// Create a function to extract the resume from a string.
function ExtractTourInfo(tour: string) -> Tour {
  // Specify a client as provider/model-name
  client "Gemini"
  prompt #"
    Extract from this content:
    {{ tour }}

    {{ ctx.output_format }}
  "#
}



// Test the function with a sample resume. Open the VSCode playground to run this.
test Presidio {
  functions [ExtractTourInfo]
  args {
    tour #"
Name of Tour: Presidio & Tunnel Tops
Guide Name: Philip Smith
Date:  6/1/25, 1:00 pm

1. How many walkers were on your roster? 15 
2. How many walkers showed up for the tour from the roster?  14 
3. How many from the wait list showed up? N/A
4. Did you have any walk-ups? 

5. Total amount of walkers on the tour:  14
6. Golden Envelope donation amount: $40 

7. Any special notes for Jef?

One no-show was sick. Walkers were all Bay Area folks, except one. Latter was a young man originally from Poland now working for Deloitte in Dubai. One local was someone I worked with 15 years ago and turns out to be a City Guides veteran of 24 or so tours. Her friend visiting from Philadelphia was a former City Guides guide, until she moved to Philly to be near her kids. Both wildly enthusiastic about SFCG!

One of the group was in an electric wheelchair - something we had just discussed with our guide group. Accompanied by her husband she was well able to handle the route, including getting in and out of the Inn at the Presidio. So not a problem at all. A Brit, originally from Manchester just like me, now living here. 

Great group overall - active, engaged, lots of good questions. Happy that by the time we arrived at Tunnel Tops the cold grey weather had turned to sun and a pretty clear view of the bay. 
    "#
  }
}

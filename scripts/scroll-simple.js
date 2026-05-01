#!/usr/bin/env node

async function scrollPage() {
  const BASE_URL = 'http://localhost:9867';

  async function request(path, body) {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined
    });
    if (!response.ok) {
      throw new Error(`${response.status}: ${await response.text()}`);
    }
    return response.json();
  }

  try {
    console.log('Creating tab for localhost:3000...');
    await request('/tab/create', {
      url: 'http://localhost:3000'
    });
    console.log('Tab created');

    // Wait for page to load
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log('Page loaded');

    // Take initial snapshot
    console.log('\n=== Initial Hero Section ===');
    const initial = await request('/snapshot', {
      selector: 'body',
      format: 'markdown'
    });
    console.log(initial.substring(0, 800) + '...');

    // Scroll down gradually
    console.log('\n=== Starting Scroll ===');
    for (let i = 0; i < 5; i++) {
      console.log(`Scrolling... Step ${i + 1}/5`);
      await request('/tab/evaluate', {
        code: 'window.scrollBy({ top: 600, behavior: "smooth" });'
      });
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Take snapshot
      console.log(`\n=== Snapshot after scroll ${i + 1} ===`);
      const snapshot = await request('/snapshot', {
        selector: 'body',
        format: 'markdown'
      });
      console.log(snapshot.substring(0, 600) + '...');
    }

    console.log('\n=== Final Screenshot ===');
    const screenshot = await request('/snapshot', {
      selector: 'body',
      format: 'image'
    });
    console.log('Screenshot captured, data length:', screenshot?.data?.length || 'no data');

  } catch (error) {
    console.error('Error:', error.message);
  }
}

scrollPage();

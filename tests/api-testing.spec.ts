import { test, expect } from '@playwright/test';

test.describe('API Testing Demo', () => {
  
  test('should make GET request and verify response', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('userId');
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('title');
    expect(data).toHaveProperty('body');
    expect(data.id).toBe(1);
  });

  test('should make POST request and create resource', async ({ request }) => {
    const newPost = {
      title: 'Playwright Test Post',
      body: 'This is a test post created by Playwright',
      userId: 1
    };
    
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: newPost
    });
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);
    
    const data = await response.json();
    expect(data.title).toBe(newPost.title);
    expect(data.body).toBe(newPost.body);
    expect(data.userId).toBe(newPost.userId);
    expect(data).toHaveProperty('id');
  });

  test('should make PUT request and update resource', async ({ request }) => {
    const updatedPost = {
      id: 1,
      title: 'Updated Title',
      body: 'Updated body content',
      userId: 1
    };
    
    const response = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
      data: updatedPost
    });
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data.title).toBe(updatedPost.title);
    expect(data.body).toBe(updatedPost.body);
  });

  test('should make DELETE request', async ({ request }) => {
    const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });

  test('should fetch multiple resources', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts');
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
    expect(data.length).toBeGreaterThan(0);
  });

  test('should verify response headers', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    
    const headers = response.headers();
    expect(headers['content-type']).toContain('application/json');
  });

  test('should handle query parameters', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts', {
      params: {
        userId: 1
      }
    });
    
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    
    expect(Array.isArray(data)).toBeTruthy();
    data.forEach((post: any) => {
      expect(post.userId).toBe(1);
    });
  });

  test('should fetch nested resources', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1/comments');
    
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    
    expect(Array.isArray(data)).toBeTruthy();
    expect(data.length).toBeGreaterThan(0);
    data.forEach((comment: any) => {
      expect(comment.postId).toBe(1);
    });
  });
});

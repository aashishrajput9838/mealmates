"use client"

import { useState } from 'react';
import { testSignIn, testSignUp, testSignOut } from '@/lib/firebase-test';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function TestAuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleTestSignIn = async () => {
    setLoading(true);
    setError('');
    setResult('');
    
    try {
      const user = await testSignIn(email, password);
      setResult(`Sign in successful! User ID: ${user.uid}`);
    } catch (err: any) {
      setError(`Sign in failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTestSignUp = async () => {
    setLoading(true);
    setError('');
    setResult('');
    
    try {
      const user = await testSignUp(email, password);
      setResult(`Sign up successful! User ID: ${user.uid}`);
    } catch (err: any) {
      setError(`Sign up failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTestSignOut = async () => {
    setLoading(true);
    setError('');
    setResult('');
    
    try {
      await testSignOut();
      setResult('Sign out successful!');
    } catch (err: any) {
      setError(`Sign out failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6">Firebase Authentication Test</h1>
      <div className="bg-card text-card-foreground rounded-lg p-6 shadow-lg w-full max-w-md space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="test@example.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <Button 
            onClick={handleTestSignIn} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Testing...' : 'Test Sign In'}
          </Button>
          
          <Button 
            onClick={handleTestSignUp} 
            disabled={loading}
            variant="outline"
            className="w-full"
          >
            {loading ? 'Testing...' : 'Test Sign Up'}
          </Button>
          
          <Button 
            onClick={handleTestSignOut} 
            disabled={loading}
            variant="secondary"
            className="w-full"
          >
            {loading ? 'Testing...' : 'Test Sign Out'}
          </Button>
        </div>
        
        {result && (
          <div className="bg-green-100 border border-green-200 text-green-800 rounded-lg p-3">
            {result}
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-200 text-red-800 rounded-lg p-3">
            {error}
          </div>
        )}
        
        <div className="text-sm text-muted-foreground mt-4">
          <p className="font-medium">Instructions:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Enter a valid email and password</li>
            <li>Use Test Sign Up to create a new account</li>
            <li>Use Test Sign In to login with existing credentials</li>
            <li>Use Test Sign Out to logout</li>
            <li>Check browser console for detailed logs</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
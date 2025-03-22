"use client";

import { useState, useCallback } from "react";
import { createActor } from "@/utils/ic-agent";

export const useIC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = useCallback(async (username: string, email: string) => {
    try {
      setLoading(true);
      setError(null);
      const actor = await createActor();
      const result = await actor.create_user(username, email);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createJob = useCallback(async (title: string, description: string) => {
    try {
      setLoading(true);
      setError(null);
      const actor = await createActor();
      const result = await actor.create_job(title, description);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getJob = useCallback(async (jobId: number) => {
    try {
      setLoading(true);
      setError(null);
      const actor = await createActor();
      const result = await actor.get_job(jobId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const listJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const actor = await createActor();
      const result = await actor.list_jobs();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    createUser,
    createJob,
    getJob,
    listJobs,
  };
};

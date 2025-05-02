import { useQuery } from "@tanstack/react-query";
import localApi from "../utils/localApi";
import axios from "axios";

//trans
// const fetchTranslation = async ({ text, to }) => {
//   const res = await localApi.post("/translate", { text, to });
//   return res.data;
// };
const fetchTranslation = async ({ text, to, proxy }) => {
  const res = await localApi.post("/translate-proxy", { text, to, proxy });
  return res.data;
};

//Def
const fetchDefinition = async (text) => {
  const res = await axios.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${text}`
  );
  return res.data[0];
};

//SynAnt
const fetchSynAnt = async (text) => {
  const synRes = await axios.get("https://api.datamuse.com/words", {
    params: { rel_syn: text },
  });
  const antRes = await axios.get("https://api.datamuse.com/words", {
    params: { res_ant: text },
  });
  return {
    synonyms: synRes.data,
    antonyms: antRes.data,
  };
};

export const useWordDetails = (text, to, proxy, enabled = "true") => {
  //Trans
  //   const useTranslationQuery = useQuery({
  //     queryKey: ["translation", text, to],
  //     queryFn: () => fetchTranslation({ text, to }),
  //     enabled: !!(enabled && text && to),
  //     staleTime: 1000 * 60 * 60,
  //     refetchOnWindowFocus: false,
  //   });
  const useTranslationQuery = useQuery({
    queryKey: ["/translate-proxy", text, to, proxy], // proxy 값을 쿼리 키에 추가
    queryFn: () => fetchTranslation({ text, to, proxy }), // proxy 값을 전달
    enabled: !!(enabled && text && to),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });

  //Def
  const useDefinitionQuery = useQuery({
    queryKey: ["definition", text],
    queryFn: () => fetchDefinition(text),
    enabled,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });

  //SynAnt
  const useSynAntQuery = useQuery({
    queryKey: ["syn-ant", text],
    queryFn: () => fetchSynAnt(text),
    enabled,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });

  return {
    translation: {
      text: useTranslationQuery.data,
      isPending: useTranslationQuery.isPending,
      isError: useTranslationQuery.isError,
      error: useTranslationQuery.error,
    },
    definition: {
      data: useDefinitionQuery.data,
      isLoading: useDefinitionQuery.isFetching,
      isError: useDefinitionQuery.isError,
      error: useDefinitionQuery.error,
    },
    synonymsAntonyms: {
      synonyms: useSynAntQuery.data?.synonyms || [],
      antonyms: useSynAntQuery.data?.antonyms || [],
      isLoading: useSynAntQuery.isFetching,
      isError: useSynAntQuery.isError,
      error: useSynAntQuery.error,
    },
  };
};

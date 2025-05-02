import { useQuery } from "@tanstack/react-query";
import localApi from "../utils/localApi";
import axios from "axios";

//trans
const fetchTranslation = async ({ text, to }) => {
  const res = await localApi.post("/translate", { text, to });
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
    params: { res_ant: word },
  });
  return {
    synonyms: synRes.data,
    antonyms: antRes.data,
  };
};

export const useWordDetails = () => {
  //trans
  const useTranslationMutation = useMutation({
    mutationKey: ["translation"],
    mutationFn: fetchTranslation,
  });

  //Def
  const useDefinitionQuery = useQuery({
    queryKey: ["definition", text],
    queryFn: () => fetchDefinition(text),
    enabled,
  });

  //SynAnt
  const useSynAntQuery = useQuery({
    queryKey: ["syn-ant", text],
    queryFn: () => fetchSynAnt(text),
    enabled,
  });
};

useEffect(() => {
  if (enabled && text && to) {
    useTranslationMutation.mutate({ text, to });
  }
}, [enabled, text, to]);

return {
  translation: {
    text: useTranslationMutation.data,
    isPending: useTranslationMutation.isPending,
  },
  definition: {
    data: useDefinitionQuery.data,
    isLoading: useDefinitionQuery.isFetching,
  },
  synonymsAntonyms: {
    synonyms: useSynAntQuery.data?.synonyms,
    antonyms: useSynAntQuery.data?.antonyms,
    isLoading: useSynAntQuery.isFetching,
  },
};

// const { definition, synonymsAntonyms, translation } = useWordDetail({
//     word: selectedWord,
//     to: "ko",  // 예를 들어 한국어로 번역
//     enabled: isModalOpen,  // 모달 열리면 데이터를 가져옴
//   });

//   // 각 섹션별로 데이터에 접근 가능
//   const { data: definitionData, isLoading: isDefLoading } = definition;
//   const { synonyms, antonyms, isLoading: isSynAntLoading } = synonymsAntonyms;
//   const { text: translatedText, isPending: isTranslating } = translation;

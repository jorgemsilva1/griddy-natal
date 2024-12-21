import styled from "styled-components";
import styles from "./page.module.css";
import { prisma } from "@/lib/prisma";
import { Game } from "./game";

export default async function Home() {
  return <Game />;
}

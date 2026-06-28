# /specs/SPEC-01-Arquitectura-General.md

**Autor: Briant Gauna**

## Objetivo

Definir la arquitectura base del sistema.

## Stack obligatorio

- HTML
- CSS
- JavaScript Vanilla
- PHP Vanilla
- SQL

## Principio central

El sistema debe estar organizado por pantallas independientes, lógica frontend separada, servicios PHP independientes y una base SQL centralizada.

## Regla principal

Cada pantalla debe tener:

- un archivo .php propio
- un archivo JS propio
- acceso a estilos globales
- conexión a datos mediante endpoints PHP

## Prohibido

- Usar React, Vue, Angular o frameworks similares
- Usar Laravel, Symfony u otros frameworks PHP
- Escribir SQL en JavaScript
- Mezclar lógica backend dentro del HTML
- Crear un único JS gigante para todo el sistema

#encoding: utf-8
#language: en
@books
Feature: Show all books in the shop

  Background:
    Given as user I want to see all books

    Scenario:
      When I visit the shop
      Then I can see all available books in a list

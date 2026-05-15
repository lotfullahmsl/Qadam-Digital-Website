"""Resolve en / ps / fa fields for public API (Phase 8)."""

from __future__ import annotations

from typing import Any


def normalize_lang(lang: str | None) -> str:
    if not lang:
        return "en"
    base = str(lang).split("-")[0].lower()
    if base in ("ps", "fa"):
        return base
    return "en"


def is_i18n_dict(value: Any) -> bool:
    if not isinstance(value, dict) or not value:
        return False
    return bool(set(value.keys()) & {"en", "ps", "fa"})


def pick_i18n(mapping: dict, lang: str | None) -> str:
    """Return best string for lang, then English, then any non-empty string value."""
    lang = normalize_lang(lang)
    for code in (lang, "en", "ps", "fa"):
        v = mapping.get(code)
        if v is None:
            continue
        if isinstance(v, str) and v.strip():
            return v
        if isinstance(v, (int, float)) and not isinstance(v, bool):
            return str(v)
    for v in mapping.values():
        if isinstance(v, str) and v.strip():
            return v
    return ""


def localize_structure(value: Any, lang: str | None) -> Any:
    """Recursively resolve i18n dicts; pass through other structures."""
    lang_n = normalize_lang(lang)
    if is_i18n_dict(value):
        return pick_i18n(value, lang_n)
    if isinstance(value, dict):
        return {k: localize_structure(v, lang_n) for k, v in value.items()}
    if isinstance(value, list):
        return [localize_structure(item, lang_n) for item in value]
    return value


def localize_document(document: dict | None, lang: str | None) -> dict | None:
    if not document:
        return document
    return localize_structure(document, lang)


def match_scalar_or_i18n(field: str, value: str) -> dict:
    """Mongo filter: field equals value OR any i18n subfield equals value."""
    return {
        "$or": [
            {field: value},
            {f"{field}.en": value},
            {f"{field}.ps": value},
            {f"{field}.fa": value},
        ]
    }


def match_regex_or_i18n(field: str, pattern: dict) -> dict:
    """Mongo filter: regex on string field or on en/ps/fa subfields."""
    return {
        "$or": [
            {field: pattern},
            {f"{field}.en": pattern},
            {f"{field}.ps": pattern},
            {f"{field}.fa": pattern},
        ]
    }

import test from 'node:test';
import assert from 'node:assert/strict';
import { formatDate, mediaUrl, safeUrl, initials } from '../lib/format.js';
test('invalid CMS dates do not crash rendering', () => { assert.equal(formatDate('bad date'), ''); assert.equal(formatDate(null), ''); });
test('media paths use the backend storage origin', () => { assert.equal(mediaUrl({path:'media/slide.jpg'}), 'http://127.0.0.1:8000/storage/media/slide.jpg'); assert.equal(mediaUrl('https://example.com/photo.jpg'), 'https://example.com/photo.jpg'); });
test('unsafe protocols and protocol-relative URLs are rejected', () => { for(const value of ['javascript:alert(1)','//evil.test','data:text/html,test','java\nscript:alert(1)','/\\evil.test']) assert.equal(safeUrl(value,'/resources'),'/resources'); });
test('initials tolerate a missing profile name', () => { assert.equal(initials(null),'DR'); assert.equal(initials('Tiara Putri'),'TP'); });
